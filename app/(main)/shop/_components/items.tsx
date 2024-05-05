"use client";

import { refillHearts } from "@/actions/user-progress";
import { createStripeUrl } from "@/actions/user-subscription";
import { Button } from "@/components/ui/button";
import { POINTS_TO_REFILL } from "@/constants";
import Image from "next/image";
import { useTransition } from "react";
import { toast } from "sonner";

type Props = {
    hearts:number;
    points:number;
    hasActiveSubscription:boolean;
}


const ItemsPage = ({
    hearts,
    points,
    hasActiveSubscription
}:Props) => {
    const[pending,startTransition] = useTransition();

    const onClick = () => {
        if(pending || hearts === 5 || points < POINTS_TO_REFILL) return;
        startTransition(()=>{
            refillHearts()
            .catch(()=>toast.error("Something went wrong"))
        })
    }

    const onUpgrade = () => {
        startTransition(()=>{
            createStripeUrl()
            .then((res)=>{
                if(res.data){
                    window.location.href = res.data
                }
            })
            .catch(()=>toast.error("Something went wrong"))
        })
    }

    return ( 
        <ul className="w-full">
            <div className="flex items-center w-full border-t-2 p-4 gap-x-4 ">
                <Image
                src="/heart.svg"
                alt="Hearts"
                height={60}
                width={60}
                />
                <div className="flex-1">
                <p className="font-bold text-base text-neutral-700 lg:text-xl dark:text-slate-200">
                    Refill Hearts
                </p>
                </div>
                <Button
                onClick={onClick}
                disabled={pending || hearts===5 || points < POINTS_TO_REFILL}>
                    {hearts === 5 ?
                    "full ❤️" :
                    <div className="flex items-center">
                        <Image
                        src="/points.svg"
                        alt="Points"
                        height={20}
                        width={20}
                        />
                        <p>
                        {POINTS_TO_REFILL}
                        </p>
                    </div>
                    }
                </Button>
            </div>
            <div className="flex items-center w-full p-4 pt-8 gap-x-4 border-t-2 ">
            <Image
            src="/unlimited.svg"
            alt="Unlimited"
            height={60}
            width={60}
            />
            <div className="flex-1">
                <p className="font-bold text-base text-neutral-700 lg:text-xl dark:text-slate-200">
                    Unlimited hearts
                </p>
            </div>
            <Button
            disabled={pending}
            onClick={onUpgrade}
            >
                {hasActiveSubscription ? "Settings" : "🚀 Upgrade" }
            </Button>
            </div>
        </ul>
    );
}

export default ItemsPage;