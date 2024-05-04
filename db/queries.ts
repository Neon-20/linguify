import {cache} from "react";
import db from "./drizzle";
import { auth } from "@clerk/nextjs";
import { courses, userProgress, units, challenges, lessons, challengesProgress, challengesRelations, challengeEnum, userSubscription } from './schema';
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

export const getUnits = cache(async() => {
    const {userId} = await auth();
    const userProgress = await getUserProgress();
    if(!userId || !userProgress || !userProgress.activeCourseId){
        return [];
    }
    //Todo: Confirm whether order is needed
    const data = await db.query.units.findMany({
        where:eq(units.courseId, userProgress?.activeCourseId),
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
            if(lesson.challenges.length===0){
                return{...lesson,completed:false}
            }
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

export const getLesson = cache(async(id?:number)=> {
    const {userId} = await auth();
    if(!userId){
        return null;
    }

    const courseProgress = await getCourseProgress();
    const lessonsId = id || courseProgress?.activeLessonId;
    if(!lessonsId){
        return null;
    }
    const data = await db.query.lessons.findFirst({
        where:eq(lessons.id,lessonsId),
        with:{
            challenges:{
                orderBy:(challenges,{asc})=>[asc(challenges.order)],
                with:{
                    challengesOptions:true,
                    challengesProgress:{
                        where:eq(challengesProgress.userId,userId)
                    }
                }
            }
        }
    })  
    console.log("getLesson is working")
    if(!data || !data.challenges){
        return null;
    }
    const normalizedChallenges = data.challenges.map((challenge)=>{
    //Todo: If something doesnt work, check the last if clause
    const completed = 
    challenge.challengesProgress &&
    challenge.challengesProgress.length>0
    && challenge.challengesProgress.every((progress) => progress.completed)
    return{...challenge,completed}
    }) 
    return {...data,challenges:normalizedChallenges}
})

export const getCourseProgress = cache(async()=>{
    const { userId } = await auth();
    const userProgress = await getUserProgress();
    if(!userId || !userProgress?.activeCourseId){
        return null;
    }
    const unitsInActiveCourse = await db.query.units.findMany({
        orderBy:(units,{asc}) => [asc(units.order)],
        where:eq(units.courseId, userProgress.activeCourseId),
        with:{
            lessons:{
                orderBy:(lessons,{asc}) => [asc(lessons.order)],
                with:{
                    units:true,
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
    // normalising the data
    // console.log("getCourseProgress is working");
    const findUncompletedLessons = unitsInActiveCourse.
    flatMap((unit)=>unit.lessons).find((lesson) => {
        //Todo: If something doesnt work, check the last if clause
        return lesson.challenges.some((challenge)=>{
            return !challenge.challengesProgress 
            || challenge.challengesProgress.length === 0
            || challenge.challengesProgress.some((progress)=>
            progress.completed === false)
        })
    })
    // return the active lessson from this
    return{
        activeLesson:findUncompletedLessons,
        activeLessonId:findUncompletedLessons?.id,
    }
})

export const getLessonPercentage = cache(async()=>{
    const {userId} = await auth();
    const courseProgress = await getCourseProgress();
    if(!courseProgress?.activeLessonId){
        return 0;
    }
    const lesson = await getLesson(courseProgress?.activeLessonId);
    if(!lesson){
        return 0;
    }
    const completedChallenges = lesson.challenges
    .filter((challenge) => challenge.completed);
    const percentage = Math.round((completedChallenges.length/lesson.challenges.length)*100);
    return percentage;
})  


const DAY_IN_MS = 86_400_000;
export const getUserSubscriptions = cache(async () => {
    const {userId} = await auth();
    if(!userId){
        return null;
    }
    const subscription = await db.query.userSubscription.findFirst({
        where:eq(userSubscription.userId,userId)
    })  
    if(!subscription) return null;

    const isActive = 
    subscription.stripePriceId
    && subscription.stripeCurrentPeriodEnd?.getTime()!
    + DAY_IN_MS > Date.now()

    return{
        ...subscription,
        isActive:!!isActive
    }

    // PURCHASING AND CANCELLING HANDLED
})
// cancelling the subscription tells stripe not to renew next month


