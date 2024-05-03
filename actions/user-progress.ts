"use server";

import db from "@/db/drizzle";
import { getCourseById, getUserProgress } from "@/db/queries";
import { challenges, userProgress } from "@/db/schema";
import { auth, currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { challengesProgress } from '../db/schema';
import { and, eq } from "drizzle-orm";

const POINTS_TO_REFILL = 5; 

export const upsertUserProgress = async(courseId:number) => {
    //authentication
    try{
    const {userId} = await auth();
    const user = await currentUser();
    if(!userId || !user){
        throw new Error("UnAuthorized");
    }
    const courses = await getCourseById(courseId);
    if(!courses){
        throw new Error("Course not found");
    }
    const existingUserProgress = await getUserProgress();
    if(existingUserProgress){
        //all I have to do is await and update over here
        const data = await db.update(userProgress).set({
            activeCourseId:courseId,
            //adding a fallback if user changes image or username
            userName:user.firstName || "User",
            userImageSrc:user.imageUrl || "/mascot.svg",
        })
        //break the cache and revalidate
        revalidatePath("/courses");
        revalidatePath("/learn");
        redirect("/learn")
    }

    const data = await db.insert(userProgress).values({
        userId,
        activeCourseId:courseId,
        userName:user.firstName || "User",
        userImageSrc:user.imageUrl || "/mascot.svg",
    })
    //break the cache and revalidate
    revalidatePath("/courses");
    revalidatePath("/learn");
    redirect("/learn");
}
catch (error) {
    console.error("Something went wrong from server:", error);
    throw error; // Rethrow the error to be handled by the caller
}
}

export const reduceHearts = async(challengeId:number) => {
    const{userId} = await auth();
    if(!userId){
        throw new Error("UnAuthorized");
    }
    const currentUserProgress = await getUserProgress();

    const challenge = await db.query.challenges.findFirst({
        where:eq(challenges.id,challengeId)
    })
    if(!challenge){
        throw new Error("Challenge not Found")
    }

    const lessonId = challenge.id

    if(!currentUserProgress){
        throw new Error("User Progress Not Found")
    }

    const existingChallengeProgress = await db.query.challengesProgress.findFirst({
    where:and(
        eq(challengesProgress.userId,userId),
        eq(challengesProgress.challengeId,challengeId)
    )
    
    })

    const isPractise = !!existingChallengeProgress;
    if(isPractise){
        return {error:"practise"}
    }

    //Todo: handle subscription over here
    if(currentUserProgress.hearts === 0){
        return {error:"hearts"}
    }

    await db.update(userProgress).set({
        hearts:Math.max(currentUserProgress.hearts-1,0)
    }).where(eq(userProgress.userId,userId))
    revalidatePath("/shop");
    revalidatePath("/quests");
    revalidatePath("/leaderboard");
    revalidatePath("/learn");
    revalidatePath(`/lesson/${lessonId}`);
}

export const refillHearts = async () => {
    const currentUserProgress = await getUserProgress();
    if(!currentUserProgress){
        throw new Error("User Progress not found")
    }
    if(currentUserProgress.hearts === 5){
        throw new Error("Hearts Already Exists")
    }
    if(currentUserProgress.points<POINTS_TO_REFILL){
        throw new Error("Not Enough Points to upgrade.")
    }
    // api route
    await db.update(userProgress).set({
        hearts:5,
        points:currentUserProgress.points-POINTS_TO_REFILL
    }).where(
        eq(userProgress.userId,currentUserProgress.userId)
    )
    //revalidating the paths
    revalidatePath("/shop");
    revalidatePath("/learn");
    revalidatePath("/quests");
    revalidatePath("/leaderboard");
}