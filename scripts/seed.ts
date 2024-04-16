import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "@/db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql,{schema});

const main = async() => {
    try{
    console.log("Seeding started");
    await db.insert(schema.courses).values([
        {
            id:1,
            title:"Indian",
            imageSrc:"/in.svg",
        },
        {
            id:2,
            title:"French",
            imageSrc:"/fr.svg",
        },
        {
            id:3,
            title:"Spanish",
            imageSrc:"/es.svg",
        },
        {
            id:4,
            title:"Italian",
            imageSrc:"/it.svg",
        }
    ])

    console.log("Seeding finished");    
    }
    catch(err){
        console.error(err);
        throw new Error("Failed to seed database")
    }
}

main()