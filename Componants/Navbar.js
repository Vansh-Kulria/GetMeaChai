'use client'
import Link from 'next/link'
import React, { useState, useRef } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'

const Navbar = () => {
    const { data: session, status } = useSession()
    const [isOpen, setIsOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname()
    const closeTimer = useRef(null);
    
    // Close mobile menu on navigation
    const handleNavClick = () => setMobileMenuOpen(false);
    const handleDropdownEnter = () => {
        if (closeTimer.current) clearTimeout(closeTimer.current);
        setIsOpen(true);
    };

    const handleDropdownLeave = () => {
        closeTimer.current = setTimeout(() => setIsOpen(false), 120); // 120ms delay
    };
    return (
        <>
        <nav className="bg-gray-800/60 backdrop-blur-2xl text-white py-3 px-3 flex justify-between items-center h-16 fixed w-full top-0 z-50">
            <div className="logo">
                <Link href="/" className="text-2xl font-bold" onClick={handleNavClick}>
                    Get me a Chai
                </Link>
            </div>

            {/* Hamburger Icon for mobile */}
            {pathname !== '/login' && ( 
            <button
                className="md:hidden flex flex-col justify-center items-center w-10 h-10 focus:outline-none"
                aria-label="Open menu"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
                
                <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                <span className={`block w-6 h-0.5 bg-white my-1 transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </button> )}

            {/* Desktop Menu */}
           <div className="hidden md:block">
                {session ? (
                    <div
                        className="relative inline-block text-left backdrop-blur-2xl"
                        onMouseEnter={handleDropdownEnter}
                        onMouseLeave={handleDropdownLeave}
                    >
                        <button
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            type="button"
                            aria-haspopup="true"
                            aria-expanded={isOpen}
                        >
                            Welcome, {session.user.name}!
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
                        {isOpen && (
                            <div
                                className="absolute z-10 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700/95  right-0 backdrop-blur-lg"
                                onMouseEnter={handleDropdownEnter}
                                onMouseLeave={handleDropdownLeave}
                            >
                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                                    <li>
                                        <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600/80 dark:hover:text-white">
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600/80 dark:hover:text-white">
                                            Home
                                        </Link>
                                    </li>
                                    <li>
                                        <a href={`/user/${session.user.name}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600/80 dark:hover:text-white">
                                            Your page
                                        </a>
                                    </li>
                                    <li>
                                        <div onClick={() => signOut()} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600/80 dark:hover:text-white cursor-pointer">
                                            Sign out
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        )}
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

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden absolute top-16 right-0 w-48 bg-gray-800/95 rounded-b-lg shadow-lg z-40 py-4">
                    <ul className="flex flex-col gap-2 px-4">
                        {session ? (
                            <>
                                <li>
                                    <span className="block px-2 py-2 font-semibold text-blue-300">Welcome, {session.user.name}!</span>
                                </li>
                                <li>
                                    <Link href="/dashboard" className="block px-2 py-2 hover:bg-gray-700 rounded" onClick={handleNavClick}>
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/" className="block px-2 py-2 hover:bg-gray-700 rounded" onClick={handleNavClick}>
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link href={`/user/${session.user.name}`} className="block px-2 py-2 hover:bg-gray-700 rounded" onClick={handleNavClick}>
                                        Your page
                                    </Link>
                                </li>
                                <li>
                                    <button
                                        onClick={() => { signOut(); setMobileMenuOpen(false); }}
                                        className="block w-full text-left px-2 py-2 hover:bg-gray-700 rounded"
                                    >
                                        Sign out
                                    </button>
                                </li>
                            </>
                        ) : (
                            pathname !== '/login' && (
                                <li>
                                    <Link href="/login" className="block w-full text-left px-2 py-2 hover:bg-gray-700 rounded" onClick={handleNavClick}>
                                        Log In
                                    </Link>
                                </li>
                            )
                        )}
                    </ul>
                </div>
            )}
        </nav>
        </>
    )
}

export default Navbar