"use server"
import mongoose, {connect} from "mongoose"
import Razorpay from "razorpay"
import Payment from "@/models/Payment"
import User from "@/models/User"


export const initiate = async (amount, to_username, paymentform) => {
    // connect to database
    const db = await connect(process.env.MONGODB_URI);

    var instance = new Razorpay({ key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, key_secret: process.env.RAZOR })

    let options = {
        amount: Number.parseInt(amount),
        currency: "INR",

    }

    let x = await instance.orders.create(options);

    // ceate a payment object which shows a pending payment in the database
    await Payment.create({
        oId: x.id, amount: amount, to_user: to_username, name: paymentform.name, message: paymentform.message})

        return x
}


export const fetchuser = async (username) => {
    const db = await mongoose.connect(process.env.MONGODB_URI);
    const user = await User.findOne({ username: username });
    if (!user) return null;
    // This ensures all nested values are plain JS types
    const u = JSON.parse(JSON.stringify(user))
    return u ;
}


export const fetchpayment = async (username) => {
    const db = await mongoose.connect(process.env.MONGODB_URI);
    const payments = await Payment.find({ to_user: username }).sort({ amount: -1 }).lean();
    // This ensures all nested values are plain JS types
    const p = JSON.parse(JSON.stringify(payments))
    return p;
}
     