"use server";

import db from "@/db/drizzle";
import { getUserProgress, getUserSubscriptions } from "@/db/queries";
import { challenges, challengesProgress, userProgress } from "@/db/schema";
import { auth, currentUser } from "@clerk/nextjs";
import { and, eq} from "drizzle-orm";
import { revalidatePath } from "next/cache";

const MAX_HEARTS = 5;
export const upsertChallengeProgress = async(challengeId:number) => {
    const {userId} = await auth();
    const user = await currentUser();
    if(!userId || !user){
        throw new Error("UnAuthorised")
    }

    const userSubscription = await getUserSubscriptions();
    
    const currentUserProgress = await getUserProgress();
    // todo:handle subscription query here

    if(!currentUserProgress){
        throw new Error("User progress not found");
    }

    const challenge = await db.query.challenges.findFirst({
        where:eq(challenges.id,challengeId)
    })
    if(!challenge){
        throw new Error("Challenge not found");
    }

    const lessonId = challenge.lessonId;
    const existingChallengeProgress = await db.query.challengesProgress.findFirst({
        where: and(
            eq(challengesProgress.userId,userId),
            eq(challengesProgress.challengeId,challengeId)
        )
    })

    const IsPractice = !!existingChallengeProgress;
    if(currentUserProgress.hearts === 0 && 
        !IsPractice
        && !userSubscription?.isActive){
        return {error:"hearts"}
    }
    
    if(IsPractice){
        await db.update(challengesProgress).set({
            completed:true,
        }).where(
            eq(challengesProgress.id,existingChallengeProgress.id),
        )

        await db.update(userProgress).set({
            hearts:Math.min(currentUserProgress.hearts+1,MAX_HEARTS),
            points:currentUserProgress.points + 10,
        }).where(
            eq(userProgress.userId,userId)
        )
        revalidatePath("/learn");
        revalidatePath("/lesson");
        revalidatePath("/quests");
        revalidatePath("/leaderboard");
        revalidatePath(`/lesson/${lessonId}`);
        return;
    }

    await db.insert(challengesProgress).values({
        challengeId,
        userId,
        completed:true,
    })

    await db.update(userProgress).set({
        points:currentUserProgress.points+10,
    }).where(
    eq(userProgress.userId,userId)
    )
    revalidatePath("/learn");
    revalidatePath("/lesson");
    revalidatePath("/quests");
    revalidatePath("/leaderboard");
    revalidatePath(`/lesson/${lessonId}`);

}