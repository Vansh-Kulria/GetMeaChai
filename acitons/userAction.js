"use server"
import mongoose, { connect } from "mongoose"
import Razorpay from "razorpay"
import Payment from "@/models/Payment"
import User from "@/models/User"


export const initiate = async (amount, to_username, paymentform) => {
    // connect to database
    const db = await connect(process.env.MONGODB_URI);
    let user = await User.findOne({ username: to_username });
    const secret = user.razorpay_secret

    var instance = new Razorpay({ key_id: user.razorpay_id, key_secret: secret })

    let options = {
        amount: Number.parseInt(amount),
        currency: "INR",

    }

    let x = await instance.orders.create(options);

    // ceate a payment object which shows a pending payment in the database
    await Payment.create({
        oId: x.id, amount: amount/100, to_user: to_username, name: paymentform.name, message: paymentform.message
    })

    return x
}


export const fetchuser = async (username) => {
    const db = await mongoose.connect(process.env.MONGODB_URI);
    const user = await User.findOne({ username: username });
    if (!user) return null;
    // This ensures all nested values are plain JS types
    const u = JSON.parse(JSON.stringify(user))
    return u;
}


export const fetchpayment = async (username) => {
    const db = await mongoose.connect(process.env.MONGODB_URI);
    const payments = await Payment.find({ to_user: username, done: true }).sort({ amount: -1 }).lean();
    // This ensures all nested values are plain JS types
    const p = JSON.parse(JSON.stringify(payments))
    return p;
}

export const updateProfile = async (data, oldusername) => {
    // connect to database
    const db = await mongoose.connect(process.env.MONGODB_URI);
    let ndata = data
    // if the username being updated, check if usernmae is available
    if (oldusername !== ndata.username) {

        let u = await User.findOne({ username: ndata.username });
        if (u) {
            return { error: "Username already taken" }
        }
        await User.updateOne({ email : ndata.email }, ndata);
        // update oldusername payment to new username
        await Payment.updateMany({ to_user: oldusername }, { to_user: ndata.username});

    }
    else{
        await User.updateOne({ email : ndata.email }, ndata);

    }


}