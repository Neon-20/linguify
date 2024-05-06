import FeedWrapper from "@/components/FeedWrapper";
import StickyWrapper from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/UserProgress";
import { getUserProgress, getUserSubscriptions } from "@/db/queries";
import { redirect } from "next/navigation";
import ShopJson from "./_components/lottie";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import Link from "next/link";
import PromoSection from "../learn/_components/promo";
import { quests } from "@/constants";

const QuestsPage = async() => {
    const userProgressData = getUserProgress();
    const userSubscriptionData = getUserSubscriptions();

    const [userProgress,userSubscription] = await Promise.all([userProgressData,userSubscriptionData])

    if(!userProgress || !userProgress.activeCourse){
        redirect("/courses");
    }

    const isPro = !!userSubscription?.isActive




    return ( 
        <div className="flex flex-row-reverse gap-[42px] px-6">
            <StickyWrapper>
            <UserProgress 
            activeCourse={userProgress.activeCourse}
            hearts={userProgress.hearts}
            points={userProgress.points}
            hasActiveSubscription={isPro}
            />
            {!isPro && (
                <PromoSection
                />
            )}
            </StickyWrapper>
            <FeedWrapper
            >
                <div className="w-full flex flex-col items-center">
                <ShopJson/>
                <h1 className="text-center font-bold text-neutral-800 dark:text-slate-200 text-2xl my-6">
                    Quests 🎯
                </h1>
                <p className="text-muted-foreground text-center text-lg mb-4">
                    Complete quests by earning points.
                </p>
                <ul className="w-full cursor-pointer">
                    <Link href="/learn">
                {quests.map((quest)=>{
                    const progress = (userProgress.points/quest.value)*100;
                    return(
                    <div key={quest.title}
                    className="w-full flex items-center p-4 gap-x-4 border-t-2"
                    >
                        <Image
                        src="/points.svg"
                        alt="Points"
                        height={60}
                        width={60}
                        />
                        <div className="flex flex-col gap-y-2 w-full">
                    <p className="font-bold text-xl text-neutral-700 dark:text-slate-200">
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
            </FeedWrapper>
        </div>
    );
}
 
export default QuestsPage;