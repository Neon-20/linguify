import { Button } from "@/components/ui/button"
import { NotebookText } from "lucide-react"
import Link from "next/link"

interface UnitBannerProps{
    title:string,
    description:string,
}

export const UnitBanner = ({
    title,
    description
}:UnitBannerProps) => {
    return(
        <div className="w-full rounded-xl bg-green-500 p-5 text-white
        flex items-center justify-between dark:text-slate-700">
        <div className="space-y-2.5">
            <h3 className="text-2xl font-bold tracking-wide">{title}</h3>
            <p className="text-lg">{description}</p>
        </div>
        <Link href="/lesson">
        <Button
        size="lg"
        variant="secondary"
        className="border border-b-4 dark:border-b-4 dark:border-slate-700 active:border-b-4 hidden xl:flex active:border-2"
        >
            <NotebookText className="mr-4"/>
            Continue
        </Button>
        </Link>
        </div>
    )
}