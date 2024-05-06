import db from "@/db/drizzle"
import { challengesOptions } from "@/db/schema"
import { IsAdmin } from "@/lib/admin"
import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"


export const GET = async (
    req:Request,
    {params}:{params:{challengesOptionsId:number}}
) => {
    if(!IsAdmin()){
        return new NextResponse("UnAuthorized",{status:403})
    }

    const data = await db.query.challengesOptions.findFirst({
    where:eq(challengesOptions.id,params.challengesOptionsId)
    })
    return NextResponse.json(data);
}

export const PUT = async (
    req:Request,
    {params}:{params:{challengesOptionsId:number}}
) => {
        if(!IsAdmin()){
            return new NextResponse("UnAuthorized",{status:403})
        }
        const body = await req.json();
        const data = await db.update(challengesOptions).set({
        ...body
        }).where(
            eq(challengesOptions.id,params.challengesOptionsId)
        ).returning()
        return NextResponse.json(data[0]);
}

export const DELETE = async (
    req:Request,
    {params}:{params:{challengesOptionsId:number}},
) => {
        if(!IsAdmin()){
            return new NextResponse("UnAuthorized",{status:403})
        }
        const data = await db.delete(challengesOptions).
        where(eq(challengesOptions.id,params.challengesOptionsId)).returning()
        return NextResponse.json(data[0]);
}
