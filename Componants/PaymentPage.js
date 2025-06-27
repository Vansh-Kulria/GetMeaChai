"use client"
import React, { useEffect } from 'react'
import Script from 'next/script'
import { initiate } from '@/acitons/userAction'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { fetchpayment, fetchuser } from '@/acitons/userAction'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const PaymentPage = ({ username }) => {
    // const { data: session } = useSession()
    const [paymentform, setpaymentform] = useState({})
    const [currentUser, setcurrentUser] = useState({})
    const [Payments, setPayments] = useState([])
    const [Error, setError] = useState("")

    useEffect(() => {
        getData()
    }, [])


    const handleChange = (e) => {
        if (e.target.name === "amount") {
            // Only allow whole numbers (no decimals, no negative)
            const value = e.target.value;
            if (/^\d*$/.test(value)) {
                setpaymentform({ ...paymentform, amount: value });
            }
        } else {
            setpaymentform({ ...paymentform, [e.target.name]: e.target.value });
        }
    };



    const getData = async (params) => {
        let u = await fetchuser(username)
        setcurrentUser(u)
        let dbpayments = await fetchpayment(username)
        setPayments(dbpayments)
        console.log(u, dbpayments)
    }

    const { data: session, status } = useSession()

    const pay = async (amount) => {
        // get the order Id
        let a = await initiate(amount, username, paymentform)
        let orderId = a.id
        console.log(a)

        var options = {
            "key": process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Get me a chai", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": "http://localhost:3000/api/razorpay",
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": session.user.name, //your customer's name
                "email": session.user.email,
                "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };

        if (typeof window !== "undefined" && window.Razorpay) {
            var rzp1 = new window.Razorpay(options);
            rzp1.open();
        } else {
            alert("Razorpay SDK failed to load. Are you online?");
        }
    }



    return (
        <>
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
            
             <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"

            />

            <div>
                <div className="cover-pic relative w-full ">
                    <img className='object-cover w-full h-[45vh]' src="https://images.pexels.com/photos/1097456/pexels-photo-1097456.jpeg" alt="Cover picture" />

                    <div className='w-full flex justify-center '>
                        <img className="w-20 rounded-full h-20 object-cover absolute -bottom-10 border" src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg" alt="profile picture" />

                    </div>

                </div>

                <div className='mt-12 flex flex-col justify-center items-center'>
                    <div className="name font-bold text-lg">@{username}</div>
                </div>

                <div className='flex flex-col justify-center items-center text-gray-400/50 text-xs gap-1 mt-2 '>
                    <div>
                        Creating Animated art for VTT's
                    </div>
                    <div>
                        9,456 members . 82 posts . $15,450/relese
                    </div>
                </div>

                <div className='flex max-w-[80vw] mx-auto mt-15 p-2 border rounded-xl gap-3'>
                    <div className='bg-gray-500/20 min-h-[330px] max-h-[330px] w-1/2 rounded-lg '>

                        <div className='font-bold px-3 py-2 text-md'>Suppoters</div>
                        <div className='text-gray-400  text-sm pl-5 flex flex-col gap-2 py-2 overflow-auto scroll-smooth max-h-[290px] overflow-y-auto
          [&::-webkit-scrollbar]:w-[.01px]
          [&::-webkit-scrollbar-track]:rounded-full
          [&::-webkit-scrollbar-track]:bg-gray-100
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-gray-300
          dark:[&::-webkit-scrollbar-track]:bg-neutral-700
          dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500'>

                            {Payments.length === 0 ? (
                                <div>No supporters yet.</div>
                            ) : (
                                Payments.map((payment, idx) => (
                                    <div key={payment._id || idx}>
                                        {payment.name} donated <span className='font-bold text-gray-300'>₹{payment.amount}</span>
                                        {payment.message && <span>
                                            {` with a message "${payment.message}"`}</span>}
                                    </div>
                                ))
                            )}
                        </div>

                    </div>
                    <div className='bg-gray-500/20  w-1/2 rounded-lg'>
                        <div className='font-bold px-3 py-2 text-md'>Make a Payment</div>
                        <div>
                            <div className='flex flex-col gap-3 px-5 py-3'>
                                <input
                                    onChange={handleChange} name='name' value={paymentform.name ? paymentform.name : ""}
                                    className='rounded-lg bg-gray-500/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600/30 px-3 py-2 transition hover:bg-gray-500/40' type="text" placeholder='Enter Name' />
                                <input
                                    onChange={handleChange} name='message' value={paymentform.message ? paymentform.message : ""}
                                    className='rounded-lg bg-gray-500/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600/30 px-3 py-2 transition hover:bg-gray-500/40' type="text" placeholder='Enter Message' />
                                <input
                                    onChange={handleChange} name='amount' value={paymentform.amount ? paymentform.amount : ""} type="number"
                                    step="1"
                                    min="1"
                                    pattern="\d*"
                                    className='rounded-lg bg-gray-500/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600/30 px-3 py-2 transition hover:bg-gray-500/40' placeholder='Enter Amount' />
                            </div>

                        </div>


                        <div className='px-5 py-3'>
                            <button
                                onClick={() => {
                                    if (!paymentform.name || !paymentform.message || !paymentform.amount) {
                                        
                                        toast.error("Please fill all fields before paying.", {
                                            position: "top-right",
                                            autoClose: 5000,
                                        });
                                        return; // Prevent pay() from running
                                    }
                                    pay(paymentform.amount);
                                }}
                                type="button"
                                className="text-white  w-full bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl
                focus:ring-2 focus:outline-none focus:ring-gray-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 cursor-pointer
                transition-all duration-300"
                            >
                                Pay
                            </button>
                        </div>

                        <div className='flex gap-2 px-5 py-2 pb-4'>
                            <div onClick={() => setpaymentform({ ...paymentform, amount: 10 })} className=' w-fit p-1 px-2 rounded-lg bg-gray-600/50 cursor-pointer hover:bg-gray-600/70 text-sm'>Pay <span className='font-bold text-gray-300'>₹10</span></div>
                            <div onClick={() => setpaymentform({ ...paymentform, amount: 20 })} className=' w-fit p-1 px-2 rounded-lg bg-gray-600/50 cursor-pointer hover:bg-gray-600/70 text-sm'>Pay <span className='font-bold text-gray-300'>₹20</span></div>
                            <div onClick={() => setpaymentform({ ...paymentform, amount: 50 })} className=' w-fit p-1 px-2 rounded-lg bg-gray-600/50 cursor-pointer hover:bg-gray-600/70 text-sm'>Pay <span className='font-bold text-gray-300'>₹50</span></div>
                        </div>



                    </div>
                </div>

            </div >


        </>
    )
}


export default PaymentPage
