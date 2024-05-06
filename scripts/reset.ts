import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "@/db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql,{schema});

const main = async() => {
    try{
    console.log("Resetting started");
    await db.delete(schema.courses);
    await db.delete(schema.userProgress);
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengesOptions);
    await db.delete(schema.challengesProgress);
    await db.delete(schema.userSubscription);

    console.log("Resetting finished");    
    }
    catch(err){
        console.error(err);
        throw new Error("Failed to Reset database")
    }
}

main()