import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "@/db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql,{schema});

const main = async() => {
    try{
    console.log("Seeding started");
    await db.delete(schema.courses);
    await db.delete(schema.userProgress);
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengesOptions);
    await db.delete(schema.challengesProgress);
    await db.delete(schema.userSubscription);
    await db.insert(schema.courses).values([
        {
            id:1,
            title:"Spanish",
            imageSrc:"/es.svg",
        },
        {
            id:2,
            title:"French",
            imageSrc:"/fr.svg",
        },
        {
            id:3,
            title:"Indian",
            imageSrc:"/in.svg",
        },
        {
            id:4,
            title:"Italian",
            imageSrc:"/it.svg",
        }
    ])
    
    await db.insert(schema.units).values([
        {
            id:1,
            courseId:1,
            title:"Spanish",
            description:"This is spanish",
            order:1,
        },
    ])
    
    await db.insert(schema.lessons).values([
        {
            id:1,
            title:"Nouns",
            unitId:1,
            order:1,
        },
        {
            id:2,
            title:"Verbs",
            unitId:1,
            order:2,
        },
        {
            id:3,
            title:"Verbs",
            unitId:1,
            order:3,
        },
        {
            id:4,
            title:"Verbs",
            unitId:1,
            order:4,
        },
        {
            id:5,
            title:"Verbs",
            unitId:1,
            order:5,
        },
    ]);

    await db.insert(schema.challenges).values([
        {
            id:1,
            lessonId:1, //Noun
            type:"SELECT",
            order:"1",
            question:'Which one of these is "the man"?'
        },  
        {
            id:2,
            lessonId:1,
            type:"ASSIST",
            order:"2",
            question:'"the man"',
        },  
        {
            id:3,
            lessonId:1,
            type:"SELECT",
            order:"3",
            question:'Which one of these is "the robot"',
        },  
    ]);

    await db.insert(schema.challengesOptions).values([
        {
            challengeId:1, //Noun
            imageSrc:"/man.svg",
            text:"el hombre",
            audioSrc:"es_man.mp3",
            correct:true,
        },
        {
            challengeId:1, //Noun
            imageSrc:"/woman.svg",
            text:"la mujer",
            audioSrc:"es_woman.mp3",
            correct:false,
        },
        {
            challengeId:1, //Noun
            imageSrc:"/robot.svg",
            text:"el robot",
            audioSrc:"es_robot.mp3",
            correct:false,
        },
    ]);

    await db.insert(schema.challengesOptions).values([
        {
            challengeId:2, 
            imageSrc:"/man.svg",
            text:"el hombre",
            audioSrc:"es_man.mp3",
            correct:true,
        },
        {
            challengeId:2, 
            imageSrc:"/woman.svg",
            text:"la mujer",
            audioSrc:"es_woman.mp3",
            correct:false,
        },
        {
            challengeId:2,
            imageSrc:"/robot.svg",
            text:"el robot",
            audioSrc:"es_robot.mp3",
            correct:false,
        },
    ]);

    await db.insert(schema.challengesOptions).values([
        {
            challengeId:3, 
            imageSrc:"/man.svg",
            text:"el hombre",
            audioSrc:"es_man.mp3",
            correct:false,
        },
        {
            challengeId:3, 
            imageSrc:"/woman.svg",
            text:"la mujer",
            audioSrc:"es_woman.mp3",
            correct:false,
        },
        {
            challengeId:3,
            imageSrc:"/robot.svg",
            text:"el robot",
            audioSrc:"es_robot.mp3",
            correct:true,
        },
    ]);

    await db.insert(schema.challenges).values([
        {
            id: 1,
            lessonId: 1, //Noun
            type: "SELECT",
            order: "1",
            question: 'Which one of these is "the man"?'
        },  
        {
            id: 2,
            lessonId: 1,
            type: "ASSIST",
            order: "2",
            question: '"the man"',
        },  
        {
            id: 3,
            lessonId: 1,
            type: "SELECT",
            order: "3",
            question: 'Which one of these is "the robot"',
        },  
    ]);
    

    console.log("Seeding finished");    
    }
    catch(err){
        console.error(err);
        throw new Error("Failed to seed database")
    }
}

main()