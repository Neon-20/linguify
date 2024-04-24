import FeedWrapper from "@/components/FeedWrapper";
import StickyWrapper from "@/components/sticky-wrapper";
import { Header } from "./_components/Header";
import { UserProgress } from "@/components/UserProgress";
import { getUnits, getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";
import { lessons } from '../../../db/schema';
import Unit from "./_components/Unit";

const LearnPage = async() => {
const userProgressData =  getUserProgress();
const unitsData =  getUnits();

const [userProgress, units] = await Promise.all([userProgressData, unitsData]);

if(!userProgress || !userProgress.activeCourse){
    redirect("/courses");
}
if(!units){
    redirect("/courses");
}

    return ( 
        <div className="flex gap-[48px] px-2">
            <FeedWrapper>
            <Header title = {userProgress.activeCourse.title} />
            {units.map((unit) => (
                <div key={unit.id} className="mb-10">
                    <Unit
                    id={unit.id}
                    title={unit.title}
                    description={unit.description}
                    courseId = {unit.courseId}
                    order={unit.order}
                    lessons={unit.lessons}
                    // todo: change the activeLesson logic
                    activeLesson={undefined}
                    activeLessonPercentage={0}
                    />
                </div>
            ))}
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