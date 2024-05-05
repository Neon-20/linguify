import db from "@/db/drizzle";
import { userSubscription } from "@/db/schema";
import { stripe } from "@/lib/stripe";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

//catch the response on success and failure from stripe
// Remember that stripe is sending the post request
// nextjs server is acting as a receiver over here
export async function POST(req:Request){
    const body = await req.text();
    const signature = headers().get("Stripe-Signature") as string;
    
    let event:Stripe.Event;

    try{
    event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
    )
    }
    catch(error:any){
    return new NextResponse(`Webhook Error:${error.message}`,{status:400})
    }

    const session = event.data.object as Stripe.Checkout.Session;
    //user is creating subscription for the first time
    if(event.type === "checkout.session.completed"){
    const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string
    )
    
    if(!session?.metadata?.userId){
        return new NextResponse("User ID not found",{status:400})
    }

    await db.insert(userSubscription).values({
        userId:session.metadata.userId,
        stripeSubscriptionId:subscription.id,
        stripeCustomerId:subscription.customer as string,
        stripePriceId:subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
            subscription.current_period_end*1000
        )
    });

    }

    // user is renewing the subscription

    if(event.type === "invoice.payment_succeeded"){
        const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
        )
        await db.update(userSubscription).set({
            stripePriceId:subscription.items.data[0].price.id,
            stripeCurrentPeriodEnd:new Date(
                subscription.current_period_end*1000
            )
        }).where(
            eq(userSubscription.stripeSubscriptionId,subscription.id)
        )
    }

    return new NextResponse(null,{status:200})
}