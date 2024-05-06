import FeedWrapper from "@/components/FeedWrapper";
import StickyWrapper from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/UserProgress";
import { getUserProgress, getUserSubscriptions } from "@/db/queries";
import { redirect } from "next/navigation";
import ItemsPage from "./_components/items";
import ShopJson from "./_components/lottie";
import PromoSection from "../learn/_components/promo";
import QuestsSection from "../quests/_components/quests";

const ShopPage = async() => {
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
            <QuestsSection points = {userProgress.points} />
            </StickyWrapper>
            <FeedWrapper
            >
                <div className="w-full flex flex-col items-center">
                <ShopJson/>
                <h1 className="text-center font-bold text-neutral-800 dark:text-slate-200 text-2xl my-6">
                    Shop Here 🤩
                </h1>
                <p className="text-muted-foreground text-center text-lg mb-6">
                    Spend points on your cool stuff with fun.
                </p>
                <ItemsPage
                hearts={userProgress.hearts}
                points={userProgress.points}
                hasActiveSubscription={isPro} 
                />
                </div>
            </FeedWrapper>
        </div>
     );
}
 
export default ShopPage;