'use client'
import Link from 'next/link'
import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'

const Navbar = () => {
    const { data: session, status } = useSession()

    // if(session){
    //     return(
    //         <>
    //         Signed in as {session.user.name}
    //         <button onClick={() => signOut()}>
    //             Sign out
    //         </button>
    //         </>
    //     )
    // }


    return (
        <nav className="bg-gray-600/30 text-white py-3 px-3 flex justify-between items-center">

            <div className="logo">
                <Link href="/" className="text-2xl font-bold">
                    Get me a Chai
                </Link>
            </div>

            <div>

                {session && <Link href="/dashboard" >
                    <button type="button"
                        className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl
                    focus:ring-2 focus:outline-none focus:ring-gray-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 cursor-pointer
                    transition-all duration-300"
                    >
                        Dashboard

                    </button>
                </Link>}

                {session ?
                    <button
                        onClick={() => signOut()}
                        type="button"
                        className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl
                        focus:ring-2 focus:outline-none focus:ring-gray-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 cursor-pointer
                        transition-all duration-300"
                    >
                        Log out
                    </button>
                    :
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
                }
            </div>

        </nav>
    )
}

export default Navbar
