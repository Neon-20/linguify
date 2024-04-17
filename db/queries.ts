import {cache} from "react";
import db from "./drizzle";
import { auth } from "@clerk/nextjs";
import { courses, userProgress, units, challenges, lessons, challengesProgress } from './schema';
import { eq } from "drizzle-orm";

export const getCourses = cache(async() => {
    const data = await db.query.courses.findMany();
    return data;
})

export const getUserProgress = cache(async() => {
    const {userId} = await auth();
    if(!userId) return null;
    const data = await db.query.userProgress.findFirst({
        where:eq(userProgress.userId, userId),
        with:{
            activeCourse:true,
        }
    })
    return data;
})

export const getCourseById = cache(async(courseId:number) => {
    const data = await db.query.courses.findFirst({
        where:eq(courses.id,courseId)
        //Todo: Populate units and lessons
    })
    return data;
})

 // We have to get the units inside the courses.

export const getUnits = cache(async() => {
    const {userId} = await auth();
    const userProgress = await getUserProgress();
    if(!userId || !userProgress || !userProgress.activeCourseId){
        return [];
    }
    //Todo: Confirm whether order is needed
    const data = await db.query.units.findMany({
        where:eq(units.courseId, userProgress.activeCourseId),
        with:{
            lessons:{
                with:{
                    challenges:{
                        with:{
                            challengesProgress:{
                                where:eq(challengesProgress.userId,userId),
                            }
                        }
                    }
                }
            }
        }
    });
    const normalizedData = data.map((unit) => {
        const lessonsCompleted = unit.lessons.map((lesson) => {
            const challengesCompleted = lesson.challenges.every((challenge) => {
                return challenge.challengesProgress 
                && challenge.challengesProgress.length > 0
                && challenge.challengesProgress.every((progress) => progress.completed)
            })
            return {...lesson,completed:challengesCompleted};
        })
        return {...unit,lessons:lessonsCompleted}
    })
    return normalizedData;
})