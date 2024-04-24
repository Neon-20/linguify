import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface HeaderProps{
    title:string
}

export const Header = ({
    title,
}:HeaderProps) => {
    return(
        <div className="items-center justify-between flex
        border-b-2 sticky top-0 bg-white pb-3 lg:mt-[-24px] lg:pt-[28px] mb-5
        text-neutral-400 lg:z-50 dark:bg-[#020817] backdrop-filter backdrop-blur-sm">
            <Link href="/courses">
                <Button
                variant="ghost" size="sm">
                    <ArrowLeft className="h-5 w-5 stroke-2
                    text-neutral-400"/>
                </Button>
            </Link>
            <h1 className="uppercase text-lg font-sans font-bold tracking-wide">
                {title}
            </h1>
            <div/>
        </div>
    )
}