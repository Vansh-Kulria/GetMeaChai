'use client'
import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const Dashboard = () => {
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push('/login')
        }
    }, [status, router])

    if (status === "loading") {
        return <div className='flex justify-center items-center min-h-[calc(100vh-148px)]'>Loading...</div>
    }

    return (
        <div className="min-h-[calc(100vh-148px)]  py-12">
            <div className='container mx-auto'>
                <h1 className='font-bold text-4xl text-center text-white mb-8 drop-shadow-lg'>Welcome to your Dashboard</h1>
                <div className="max-w-lg mx-auto bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 flex flex-col gap-6 border border-white/20">
                    <div className='flex flex-col gap-2'>
                        <label className='text-sm text-gray-200 font-semibold' htmlFor="name">Name</label>
                        <input
                            className='rounded-lg bg-gray-500/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600/50 px-3 py-2 transition hover:bg-gray-500/40'
                            type="text"
                            id="name"
                            placeholder="Enter your name"
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className='text-sm text-gray-200 font-semibold' htmlFor="email">Email</label>
                        <input
                            className='rounded-lg bg-gray-500/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600/50 px-3 py-2 transition hover:bg-gray-500/40'
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className='text-sm text-gray-200 font-semibold' htmlFor="username">Username</label>
                        <textarea
                            className='rounded-lg bg-gray-500/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600/50 px-3 py-2 transition hover:bg-gray-500/40 resize-none'
                            id="username"
                            rows={3}
                            placeholder="Username"
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className='text-sm text-gray-200 font-semibold' htmlFor="website">Website</label>
                        <input
                            className='rounded-lg bg-gray-500/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600/50 px-3 py-2 transition hover:bg-gray-500/40'
                            type="url"
                            id="website"
                            placeholder="https://yourwebsite.com"
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className='text-sm text-gray-200 font-semibold' htmlFor="twitter">Twitter</label>
                        <input
                            className='rounded-lg bg-gray-500/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600/50 px-3 py-2 transition hover:bg-gray-500/40'
                            type="text"
                            id="twitter"
                            placeholder="@yourhandle"
                        />
                    </div>
                    <div className='flex justify-center mt-4'>
                        <button
                            className="bg-gradient-to-br from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-bold py-2 px-8 rounded-lg shadow-lg transition-all duration-300"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard