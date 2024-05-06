"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { quests } from "@/constants";
import { Progress } from "@/components/ui/progress";

type Props = {
    points:number
}

const QuestsSection = ({points}:Props) => {
    return ( 
        <div className="border-2 rounded-xl p-4 pb-4 mb-6 space-y-4 ">
            <div className="flex items-center justify-between
            w-full space-y-2">
                <h3 className="text-lg font-bold">
                    Quests
                </h3>
                <Link href="/quests">
                <Button
                variant="primaryOutline"
                size="sm"
                className="mb-2"
                >
                    View all
                </Button>
                </Link>
            </div>
            <ul className="w=full">
            <Link href="/learn">
                {quests.map((quest)=>{
                    const progress = (points/quest.value)*100;
                    return(
                    <div key={quest.title}
                    className="w-full flex items-center p-4 gap-x-4 border-t-2"
                    >
                        <Image
                        src="/points.svg"
                        alt="Points"
                        height={40}
                        width={40}
                        />
                        <div className="flex flex-col gap-y-2 w-full">
                    <p className="font-bold text-lg text-neutral-700 dark:text-slate-200">
                        {quest.title} ⭐️
                    </p>
                    <Progress value={progress} className="h-3"/>
                    </div>
                    </div>
                    )
                })}
                </Link>
            </ul>
        </div>
    );
}

export default QuestsSection;