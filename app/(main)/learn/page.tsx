import FeedWrapper from "@/components/FeedWrapper";
import StickyWrapper from "@/components/sticky-wrapper";
import { Header } from "./_components/Header";
import { UserProgress } from "@/components/UserProgress";

const LearnPage = () => {
    return ( 
        <div className="flex gap-[48px] px-2">
            <FeedWrapper>
            <Header title="Spanish"/>
            </FeedWrapper>
            <StickyWrapper>
                <UserProgress
                activeCourse={{title:"Spanish", imageSrc:"/es.svg"}}
                hearts={5}
                points={10}
                hasActiveSubscription={false}
                />
            </StickyWrapper>
        </div>
    );
}

export default LearnPage;