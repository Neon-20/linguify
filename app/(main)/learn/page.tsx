import FeedWrapper from "@/components/FeedWrapper";
import StickyWrapper from "@/components/sticky-wrapper";
import { Header } from "./_components/Header";
import { UserProgress } from "@/components/UserProgress";
import { getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";

const LearnPage = async() => {
const userProgress = await getUserProgress();

if(!userProgress || !userProgress.activeCourse){
    redirect("/courses");
}

    return ( 
        <div className="flex gap-[48px] px-2">
            <FeedWrapper>
            <Header title = {userProgress.activeCourse.title} />
            </FeedWrapper>
            <StickyWrapper>
                <UserProgress
                activeCourse={userProgress.activeCourse}
                hearts={userProgress.hearts}
                points={userProgress.points}
                hasActiveSubscription={false}
                />
            </StickyWrapper>
        </div>
    );
}

export default LearnPage;