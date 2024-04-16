"use server";

import db from "@/db/drizzle";
import { getCourseById, getUserProgress } from "@/db/queries";
import { userProgress } from "@/db/schema";
import { auth, currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
