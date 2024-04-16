import Link from "next/link"
import { Button } from "./ui/button"
import Image from "next/image"
import { Infinity, InfinityIcon } from "lucide-react"
import { courses } from "@/db/schema"


interface UserProgressProps{
    activeCourse:typeof courses.$inferSelect, //TODO: replace with DB types soon
    hearts:number,
    points:number,
    hasActiveSubscription:boolean
}

export const UserProgress = ({
    activeCourse,
    points,
    hearts,
    hasActiveSubscription
}:UserProgressProps) => {
    return(
        <div className="flex items-center justify-between gap-x-2
        w-full">
            <Link href="/courses">
                <Button
                variant="ghost"
                >
                    <Image
                    src={activeCourse.imageSrc}
                    alt={activeCourse.title}
                    className="rounded-md border"
                    height={32}
                    width={32}
                    />
                </Button>
            </Link>
            <Link href="/shop">
                <Button variant = "ghost" className="text-orange-500">
                <Image src="/points.svg" alt="Points" height={28} width={28}
                className="mr-2"
                />
                {points}
                </Button>
            </Link>
            <Link href="/shop">
                <Button variant = "ghost" className="text-rose-500">
                <Image src="/heart.svg" alt="Hearts" height={22} width={22}
                className="mr-2"
                />
                {hasActiveSubscription ? <InfinityIcon className="h-4 w-4 stroke-[3]"/> : hearts}
                </Button>
            </Link>
        </div>
    )
}