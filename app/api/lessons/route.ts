import { NextResponse } from "next/server";
import db from "@/db/drizzle";
import { lessons } from "@/db/schema";
import { IsAdmin } from "@/lib/admin";

export async function GET(){
    if(!IsAdmin()){
        return new NextResponse("UnAuthorized",{status:401})
    }
    const data = await db.query.lessons.findMany();
    return NextResponse.json(data);
}

export async function POST(req:Request){
    if(!IsAdmin()){
        return new NextResponse("UnAuthorized",{status:401})
    }
    const body = await req.json();
    const data = await db.insert(lessons).values({  
    ...body
    }).returning()


    return NextResponse.json(data[0]);
}
