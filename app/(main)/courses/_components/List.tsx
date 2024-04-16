"use client";

import { courses, userProgress } from "@/db/schema";
import { CardPage } from "./card";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { upsertUserProgress } from "@/actions/user-progress";
import { toast } from "sonner";

interface ListProps {
    courses: typeof courses.$inferSelect[];
    activeCourseId?:typeof userProgress.$inferSelect.activeCourseId,
}
    

export const List = ({
    courses,
    activeCourseId,
}:ListProps) => {
const router = useRouter();
const [pending,startTransition] = useTransition();

const onClick = (id:number) => {
    if(pending) return;
    //suppose ID is already active then we throw to existing learn page
    if(id === activeCourseId){
        return router.push("/learn");
    }
    startTransition(()=>{
    upsertUserProgress(id).
    catch(()=>toast.error("Something went wrong"))
    })
}

    return(
        <div className="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
        {courses.map((course)=>(
            <CardPage
            key={course.id}
            id={course.id}
            title={course.title}
            imageSrc={course.imageSrc}
            disabled={pending}
            onClick={onClick}
            active={course.id === activeCourseId}
            />
        ))}
        </div>
    )
}