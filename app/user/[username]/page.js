import PaymentPage from '@/Componants/PaymentPage'
import React from 'react'
import { notFound } from 'next/navigation'
import User from '@/models/User'
import { connect } from 'mongoose'

const Username = async ({ params }) => {
  // if the username is not present in the database, show 404 page
  const checkUser = async () => {
    // connect db
    const db = await connect(process.env.MONGODB_URI);
    const user = await User.findOne({ username: params.username })
    if (!user) {
      return notFound()
      }

  }

  await checkUser()
    
  return (
    <>
      <PaymentPage username={params.username} />
    </>
  )
}

export default Username

export async function generateMetadata({params}) {
  return{
  title: `Support ${params.username} - Get me a Chai`,
  description: "Login to your Get me a Chai account and connect with your fans.",
}}