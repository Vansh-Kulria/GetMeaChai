// pages/api/auth/[...nextauth].js
import { connect } from "mongoose"
import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import User from "@/models/User"

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "github") {
        await connect(process.env.MONGODB_URI)
        let dbUser = await User.findOne({ email: user.email })
        if (!dbUser) {
          dbUser = await User.create({
            username: user.email.split("@")[0],
            email: user.email,
          })
        }
        user.id = dbUser._id.toString()
      }
      return true
    },
    
    async jwt({ token, user }) {
      if (user?.id) token.sub = user.id
      return token
    },
    async session({ session, token }) {
      await connect(process.env.MONGODB_URI)
      const dbUser = await User.findById(token.sub)
      session.user = {
        id: dbUser._id.toString(),
        name: dbUser.username,
        email: dbUser.email,
      }
      return session
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
