import db from "@/db/drizzle"
import { courses } from "@/db/schema"
import { IsAdmin } from "@/lib/admin"
import { eq, param } from "drizzle-orm"
import { NextResponse } from "next/server"


export const GET = async (
    req:Request,
    {params}:{params:{courseId:number}}
) => {
    if(!IsAdmin()){
        return new NextResponse("UnAuthorized",{status:403})
    }

    const data = await db.query.courses.findFirst({
    where:eq(courses.id,params.courseId)
    })
    return NextResponse.json(data);
}

export const PUT = async (
    req:Request,
    {params}:{params:{courseId:number}}
) => {
        if(!IsAdmin()){
            return new NextResponse("UnAuthorized",{status:403})
        }
        const body = await req.json();
        const data = await db.update(courses).set({
        ...body
        }).where(
            eq(courses.id,params.courseId)
        ).returning()
        return NextResponse.json(data[0]);
}

export const DELETE = async (
    req:Request,
    {params}:{params:{courseId:number}},
) => {
        if(!IsAdmin()){
            return new NextResponse("UnAuthorized",{status:403})
        }
        const data = await db.delete(courses).
        where(eq(courses.id,params.courseId)).returning()
        return NextResponse.json(data[0]);
}
