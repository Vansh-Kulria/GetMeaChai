'use client'
import Link from 'next/link'
import React from 'react'
import { useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'

const Navbar = () => {
    const { data: session, status } = useSession()
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname()

    return (
        <nav className="bg-gray-600/30 text-white py-3 px-3 flex justify-between items-center h-15 ">

            <div className="logo">
                <Link href="/" className="text-2xl font-bold">
                    Get me a Chai
                </Link>
            </div>

            <div>



                {session ? (
                    <div
                        className="relative inline-block text-left"
                        onMouseEnter={() => setIsOpen(true)}
                        
                    >
                        <button
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            type="button"
                        >
                            Welcome , {session.user.name}!
                            <svg
                                className="w-2.5 h-2.5 ms-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 10 6"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 4 4 4-4"
                                />
                            </svg>
                        </button>

                        <div onMouseEnter={() => setIsOpen(true)}
                        onMouseLeave={() => setTimeout(() => {
                            setIsOpen(false)
                        }, 1000) } >
                        {isOpen && (
                            <div  className="absolute z-10 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 right-0">
                                <ul 
                                
                                className="py-2 text-sm text-gray-700 dark:text-gray-200">
                                    <li>
                                        <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                            Home
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={`/user/${session.user.name}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                            Your page
                                        </Link>
                                    </li>
                                   
                                    <li>
                                        <div onClick={() => signOut()}  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                            Sign out
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        )}
                        </div>
                    </div>

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