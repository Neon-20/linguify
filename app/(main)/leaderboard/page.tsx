import FeedWrapper from "@/components/FeedWrapper";
import StickyWrapper from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/UserProgress";
import { getTopUsers, getUserProgress, getUserSubscriptions } from "@/db/queries";
import { redirect } from "next/navigation";
import ShopJson from "./_components/lottie";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AnimatedTooltip } from "@/components/animated-tooltip";
import PromoSection from "../learn/_components/promo";
import QuestsSection from "../quests/_components/quests";

const LeaderBoardPage = async() => {
    const userProgressData = getUserProgress();
    const userSubscriptionData = getUserSubscriptions();
    const topTenUsersData = getTopUsers();

    const [userProgress,userSubscription,topTenUsers] = await Promise.all([userProgressData,userSubscriptionData,topTenUsersData])

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
            <QuestsSection points = {userProgress.points} />
            </StickyWrapper>
            <FeedWrapper
            >
                <div className="w-full flex flex-col items-center">
                <ShopJson/>
                <h1 className="text-center font-bold text-neutral-800 dark:text-slate-200 text-2xl my-6">
                    LeaderBoard 🥇
                </h1>
                <p className="text-muted-foreground text-center text-lg mb-4">
                    Check where you stand among other learners.
                </p>
                <Separator className="mb-4 h-0.5 rounded-full"/>
                {topTenUsers.map((userProgress,index)=>(
                    <div key={userProgress.userId}
                    className="items-center justify-center px-4
                    flex w-full p-2 hover:bg-gray-200/50 dark:hover:bg-accent rounded-xl cursor-pointer"
                    >
                        <p className="font-bold text-slate-700 mr-4 dark:text-slate-200">{index+1}</p>
                        <Avatar className="border bg-slate-100 h-8 w-8 mr-6 cursor-pointer">
                            <AvatarImage
                            className="object-cover"
                            src={userProgress.userImageSrc}
                            />
                        </Avatar>
                        <p className="font-bold text-neutral-800 flex-1 dark:text-slate-200">
                        {userProgress.userName}
                        </p>
                        <p className="text-muted-foreground dark:text-slate-200">
                            {userProgress.points} XP
                        </p>
                    </div>
                ))}
                <div className="flex mt-4 items-center justify-center mb-10 w-full cursor-pointer">
                <AnimatedTooltip items={topTenUsers}/>
                </div>
                </div>
            </FeedWrapper>
        </div>
    );
}
 
export default LeaderBoardPage;