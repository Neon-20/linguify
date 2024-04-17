import { lessons, units } from "@/db/schema"

interface UnitProps{
    id:number
    title:string
    description:string
    order:number
    lessons:(typeof lessons.$inferSelect & {
        completed:boolean
    })[],
    activeLesson:(typeof lessons.$inferSelect & {
        unit:typeof units.$inferSelect
    }) | undefined,
    activeLessonPercentage:number
}
const Unit = ({
    id,
    title,
    description,
    order,
    lessons,
    activeLesson,
    activeLessonPercentage
}:UnitProps) => {
    return ( 
        <div>
            {}
        </div>
    );
}

export default Unit;