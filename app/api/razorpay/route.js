import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment";
import Razorpay from "razorpay";
import { connect } from "mongoose";
import User from "@/models/User";

export const POST = async (req) => {
  try {
    // 1️⃣ Ensure DB connection
    await connect(process.env.MONGODB_URI);

    // 2️⃣ Parse the formData payload
    let body = Object.fromEntries(await req.formData().then(f => f.entries()));
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({
        success: false,
        message: "Missing one of razorpay_order_id, payment_id or signature"
      }, { status: 400 });
    }

    // 3️⃣ Lookup your Payment by the Razorpay order ID → your schema's `oId`
    const existing = await Payment.findOne({ oId: razorpay_order_id });
    if (!existing) {
      console.error("No Payment found for oId:", razorpay_order_id);
      return NextResponse.json({
        success: false,
        message: "Order ID not found in Payment collection"
      }, { status: 404 });
    }

    // 4️⃣ Grab the recipient's secret to verify the signature
    const recipient = await User.findOne({ username: existing.to_user });
    if (!recipient || !recipient.razorpay_secret) {
      console.error("No user or missing razorpay_secret for:", existing.to_user);
      return NextResponse.json({
        success: false,
        message: "Recipient user or razorpay_secret not found"
      }, { status: 404 });
    }

    // 5️⃣ Verify the payment
    const isValid = validatePaymentVerification(
      { order_id: razorpay_order_id, payment_id: razorpay_payment_id },
      razorpay_signature,
      recipient.razorpay_secret
    );

    if (!isValid) {
      return NextResponse.json({
        success: false,
        message: "Payment signature verification failed"
      }, { status: 402 });
    }

    // 6️⃣ Mark the Payment as done
    const updatedPayment = await Payment.findOneAndUpdate(
      { oId: razorpay_order_id },
      { done: true },
      { new: true }
    );

    if (!updatedPayment) {
      console.error("Failed to update Payment for oId:", razorpay_order_id);
      return NextResponse.json({
        success: false,
        message: "Failed to mark payment done"
      }, { status: 500 });
    }

    // 7️⃣ Increment the recipient’s `received` tally
    await User.findOneAndUpdate(
      { username: updatedPayment.to_user },
      { $inc: { received: updatedPayment.amount } }
    );

    // 8️⃣ Redirect back to the user’s page with a flag
    return NextResponse.redirect(
      `${process.env.NEXTAUTH_URL}/user/${updatedPayment.to_user}?paymentdone=true`
    );
  } catch (err) {
    console.error("Error in payment callback:", err);
    return NextResponse.json({
      success: false,
      message: "Server error during payment processing",
      error: err.message
    }, { status: 500 });
  }
};
