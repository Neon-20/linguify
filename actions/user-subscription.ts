"use server";

import { getUserSubscriptions } from '@/db/queries';
import { stripe } from '@/lib/stripe';
import { absoluteUrl } from '@/lib/utils';
import { auth,  currentUser } from '@clerk/nextjs';

const returnUrl = absoluteUrl("/shop")

export const createStripeUrl = async() => {
    const{userId} = await auth();
    const user = await currentUser();
    
    if(!user || !userId){
        throw new Error("UnAuthorized");
    }

    const userSub = await getUserSubscriptions();

    //if already subscribed
    if(userSub && userSub.stripeCustomerId){
        const stripeSession = await stripe.billingPortal.sessions.create({
            customer:userSub.stripeCustomerId,
            return_url:returnUrl,
        })
        return {data: returnUrl}
    }
    
    //Not subscribed, subscribing for first time, checkout url
    const stripeSession = await stripe.checkout.sessions.create({
        mode:"subscription",
        payment_method_types:["card"],
        customer_email:user.emailAddresses[0].emailAddress,
        line_items:[
            {
                quantity:1,
                price_data:{
                    currency:"USD",
                    product_data:{
                        name:"Linguify Pro",
                        description:"Get Unlimited Hearts"
                    },
                    unit_amount:2000, //$20
                    recurring:{
                        interval:"month"
                    }
                },
            },
        ],
        metadata:{
            userId,
        },
        success_url:returnUrl,
        cancel_url:returnUrl
    })
    return {data:stripeSession.url}
}