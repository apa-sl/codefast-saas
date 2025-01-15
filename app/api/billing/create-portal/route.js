import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectMongoDB from "@/libs/mongoose";
import User from "@/models/User";
import Stripe from "stripe";

export async function POST(req) {
  try {
    const body = await req.json();

    // check if FE provided required Success & Cancel URLs
    if (!body.returnUrl) {
      return NextResponse.json(
        { error: "Return URL is required" },
        { status: 400 }
      );
    }

    // get the user
    const session = await auth();
    await connectMongoDB();
    const user = await User.findById(session.user.id);

    // connect with Stripe
    const stripe = new Stripe(process.env.STRIPE_API_KEY);

    const stripeCustomerPortal = await stripe.billingPortal.sessions.create({
      customer: user.customerId,
      return_url: body.returnUrl,
    });

    return NextResponse.json({ url: stripeCustomerPortal.url });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
