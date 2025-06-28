'use client'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { fetchuser, updateProfile } from '@/acitons/userAction'
import './loader.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify'


const Dashboard = () => {
    const { data: session, status, update } = useSession()
    const router = useRouter()
    const [form, setform] = useState({})

    const getData = async () => {
        if (!session?.user?.name)
            return
        let u = await fetchuser(session.user.name)
        setform(u)
    }

    useEffect(() => {
        document.title = "Dashboard | GetMeAChai";
        if (status === "authenticated" && session?.user?.name) {
            getData();
        }
        if (status === "unauthenticated") {
            router.push('/login');
        }
    }, [status, router, session]);

    if (status === "loading") {
        return <div className='flex justify-center items-center min-h-[calc(100vh-148px)]'>
            <div className="card">
                <div className="loader">
                    <p>loading</p>
                    <div className="words">
                        <span className="word">buttons</span>
                        <span className="word">forms</span>
                        <span className="word">switches</span>
                        <span className="word">cards</span>
                        <span className="word">buttons</span>
                    </div>
                </div>
            </div>

        </div>
    }

    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {

        await updateProfile(form, session.user.name);
        // If username was changed, update session
        if (form.username && form.username !== session.user.name) {
            await update();
            window.location.reload();

        }
        toast.success('Profile updated successfully', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });

    }


    return (

        <div className="min-h-[calc(100vh-148px)]  py-12">
            <div className='md:container md:mx-auto mx-4'>
                <h1 className='font-bold text-4xl text-center text-white mb-8 drop-shadow-lg'>Welcome to your Dashboard</h1>
                <div className="max-w-lg mx-auto bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 flex flex-col gap-6 border border-white/20">
                    <div className='flex flex-col gap-2'>
                        <label className='text-sm text-gray-200 font-semibold' htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" value={form.name ? form.name : ""} onChange={handlechange}
                            className='rounded-lg bg-gray-500/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600/50 px-3 py-2 transition hover:bg-gray-500/40'
                            placeholder="Enter your name"
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className='text-sm text-gray-200 font-semibold' htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" value={form.email ? form.email : ""} onChange={handlechange}
                            className='rounded-lg bg-gray-500/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600/50 px-3 py-2 transition hover:bg-gray-500/40'
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className='text-sm text-gray-200 font-semibold' htmlFor="username">Username</label>
                        <input type="text" name="username" id="username" value={form.username ? form.username : ""} onChange={handlechange}
                            className='rounded-lg bg-gray-500/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600/50 px-3 py-2 transition hover:bg-gray-500/40 resize-none'
                            placeholder="Username"
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='text-sm text-gray-200 font-semibold' htmlFor="profile_pic">Profile pic</label>
                        <input type="text" name="profile_pic" id="profile_pic" value={form.profile_pic ? form.profile_pic : ""} onChange={handlechange}
                            className='rounded-lg bg-gray-500/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600/50 px-3 py-2 transition hover:bg-gray-500/40 resize-none'
                            placeholder="profile img url"
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='text-sm text-gray-200 font-semibold' htmlFor="cover_pic">Cover pic</label>
                        <input type="text" name="cover_pic" id="cover_pic" value={form.cover_pic ? form.cover_pic : ""} onChange={handlechange}
                            className='rounded-lg bg-gray-500/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600/50 px-3 py-2 transition hover:bg-gray-500/40 resize-none'
                            placeholder="cover img url"
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='text-sm text-gray-200 font-semibold' htmlFor="razorpay_id">Razorpay Id</label>
                        <input type="text" name="razorpay_id" id="razorpay_id" value={form.razorpay_id ? form.razorpay_id : ""} onChange={handlechange}
                            className='rounded-lg bg-gray-500/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600/50 px-3 py-2 transition hover:bg-gray-500/40 resize-none'
                            placeholder="Razorpay Id"
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='text-sm text-gray-200 font-semibold' htmlFor="razorpay_secret">Razorpay Secret</label>
                        <input type="password" name="razorpay_secret" id="razorpay_secret" value={form.razorpay_secret ? form.razorpay_secret : ""} onChange={handlechange}
                            className='rounded-lg bg-gray-500/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600/50 px-3 py-2 transition hover:bg-gray-500/40 resize-none'
                            placeholder="Razorpay secret key"
                        />
                    </div>


                    <div className='flex justify-center mt-4'>
                        <button onClick={() => handleSubmit(form)}
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


