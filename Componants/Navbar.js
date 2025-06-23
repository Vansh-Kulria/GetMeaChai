'use client'
import Link from 'next/link'
import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'

const Navbar = () => {
    const { data: session, status } = useSession()
    const pathname = usePathname()

    return (
        <nav className="bg-gray-600/30 text-white py-3 px-3 flex justify-between items-center h-15">

            <div className="logo">
                <Link href="/" className="text-2xl font-bold">
                    Get me a Chai
                </Link>
            </div>

            <div>
                {session && (
                    <Link href="/dashboard" >
                        <button type="button"
                            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl
                        focus:ring-2 focus:outline-none focus:ring-gray-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 cursor-pointer
                        transition-all duration-300"
                        >
                            Dashboard
                        </button>
                    </Link>
                )}

                {session ? (
                    <button
                        onClick={() => signOut()}
                        type="button"
                        className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl
                        focus:ring-2 focus:outline-none focus:ring-gray-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 cursor-pointer
                        transition-all duration-300"
                    >
                        Log out
                    </button>
                ) : (
                    pathname !== '/login' && (
                        <Link href="/login">
                            <button
                                type="button"
                                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl
                                focus:ring-2 focus:outline-none focus:ring-gray-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 cursor-pointer
                                transition-all duration-300"
                            >
                                Log In
                            </button>
                        </Link>
                    )
                )}
            </div>

        </nav>
    )
}

export default Navbar