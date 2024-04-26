import FeedWrapper from "@/components/FeedWrapper";
import StickyWrapper from "@/components/sticky-wrapper";
import { Header } from "./_components/Header";
import { UserProgress } from "@/components/UserProgress";
import { getCourseProgress, getLessonPercentage, getUnits, getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";
import { lessons,units as UnitSchema } from '../../../db/schema';
import Unit from "./_components/Unit";

const LearnPage = async() => {
const userProgressData =  getUserProgress();
const unitsData =  getUnits();
const courseProgressData = getCourseProgress();
const lessonPercentageData = getLessonPercentage();

const [userProgress, units,courseProgress,lessonPercentage] = 
await Promise.all([userProgressData, unitsData,courseProgressData,lessonPercentageData]);

if(!userProgress || !userProgress.activeCourse){
    redirect("/courses");
}

if(!courseProgress){
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
                    activeLesson={courseProgress?.activeLesson as typeof lessons.$inferSelect & {
                        unit:typeof UnitSchema.$inferSelect
                    } | undefined}
                    activeLessonPercentage={lessonPercentage}
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