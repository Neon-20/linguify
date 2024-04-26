import { lessons, units } from "@/db/schema"
import { UnitBanner } from "./UnitBanner"
import LessonButton from "./LessonButton"

interface UnitProps{
    id:number
    title:string
    description:string
    courseId:number //this can be removed if doesnt work
    order:number
    lessons:(typeof lessons.$inferSelect & {
        completed:boolean
    })[],
    activeLesson:(typeof lessons.$inferSelect & {
        unit:typeof units.$inferSelect
    }) | undefined ,
    activeLessonPercentage:number
}
const Unit = ({
    id,
    courseId,
    title,
    description,
    order,
    lessons,
    activeLesson,
    activeLessonPercentage
}:UnitProps) => {
    return ( 
        <div>
        <UnitBanner title = {title} description = {description} />
        <div className="flex flex-col items-center relative">
            {lessons.map((lesson,index)=>{
                const isCurrent = lesson.id === activeLesson?.id;
                const isLocked = !lesson.completed && !isCurrent;

                return (
                    <LessonButton key={lesson.id}
                    id={lesson.id}
                    index={index}
                    totalCount={lessons.length-1}
                    locked={isLocked}
                    current={isCurrent}
                    percentage={activeLessonPercentage}
                    />
                )
            })}
        </div>
        </div>
    );
}

export default Unit;