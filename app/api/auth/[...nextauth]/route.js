import { connect } from "mongoose";
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import User from "@/models/User";
// import Payment from "@/models/Payment";

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],


  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account.provider === "github") {
        // connect to the database
        const db = await connect(process.env.MONGODB_URI);
        // check if the user already exists in the database
        const currentUser = await User.findOne({ email: user.email });
        if (!currentUser) {
          // if the user doesn't exist, create a new user
          const newUser = new User({
            username: user.email.split('@')[0],
            email: user.email,
          })
          await newUser.save();
          user.name = newUser.username
        }
        else{
          user.name = currentUser.username
        }
      }
      return true
    }
  },

  async session ({ session, user, token }) {
    const dbUser = await User.findOne({ email: user.email });
    session.user.name = dbUser.username
    return session
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };