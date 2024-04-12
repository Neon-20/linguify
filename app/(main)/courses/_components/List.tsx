"use client";

import { courses } from "@/db/schema";
import { CardPage } from "./card";

interface ListProps {
    courses: typeof courses.$inferSelect[];
    activeCourseId:number,
}


export const List = ({
    courses,
    activeCourseId,
}:ListProps) => {
    return(
        <div className="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
        {courses.map((course)=>(
            <CardPage
            key={course.id}
            id={course.id}
            title={course.title}
            imageSrc={course.imageSrc}
            disabled={false}
            onClick={() => {}}
            active={course.id === activeCourseId}
            />
        ))}
        </div>
    )
}