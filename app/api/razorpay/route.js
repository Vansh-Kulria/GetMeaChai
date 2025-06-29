import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment";
import Razorpay from "razorpay";
import { connect } from "mongoose";
import User from "@/models/User";

export const POST = async (req) => {
  try {
    await connect(process.env.MONGODB_URI);

    let body = await req.formData();
    body = Object.fromEntries(body);

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ success: false, message: "Missing payment fields" });
    }

    // Fetch the payment record
    const p = await Payment.findOne({ oId: razorpay_order_id });
    if (!p) {
      return NextResponse.json({ success: false, message: "Order Id not found" });
    }

    // fatch the secret of the user who is getting the payment
    const user = await User.findOne({ username : p.to_user});
    const secret = user.razorpay_secret


    // Validate signature
    const isValid = validatePaymentVerification(
      {
        order_id: razorpay_order_id,
        payment_id: razorpay_payment_id,
      },
      razorpay_signature,
      secret
    );

    if (isValid) {
     // 1️⃣ Mark the payment done & grab the fresh doc
     const updatedPayment = await Payment.findOneAndUpdate(
       { oId: razorpay_order_id },
       { done: true },
       { new: true }
     );

     // 2️⃣ Debug guard: fail early if something’s still missing
     if (!updatedPayment || !updatedPayment.to_user) {
       console.error(
         "🚨 Payment updated but to_user missing:",
         updatedPayment
       );
       return NextResponse.json({
         success: false,
         message: "Payment record is malformed",
       }, { status: 500 });
     }
      
      return NextResponse.redirect(
        `${process.env.NEXTAUTH_URL}/user/${updatedPayment.to_user}?paymentdone=true`
      );
    } else {
      return NextResponse.json({ success: false, message: "Payment verification failed" });
    }
  } catch (err) {
    console.error("Error in payment callback:", err);
    return NextResponse.json({ success: false, message: "Server Error", error: err.message });
  }
};
