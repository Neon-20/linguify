import {neon} from "@neondatabase/serverless";
import {drizzle} from "drizzle-orm/neon-http";
import * as schema from "./schema";

// instantiation of the db client
const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql,{schema});

export default db;
