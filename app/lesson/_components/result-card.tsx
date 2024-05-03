import { cn } from "@/lib/utils";
import Image from "next/image";

interface ResultCardProps{
    variant:"points" | "hearts"
    value:number
}

const ResultCard = ({
    variant,
    value
}:ResultCardProps) => {
    const imageSrc = variant === "hearts" ? "/heart.svg" : "/points.svg";
    return ( 
        <div className={cn("rounded-2xl border-2 w-full",
            variant === "points" && "bg-orange-400 border-orange-400",
            variant === "hearts" && "bg-rose-400 border-rose-400"
        )}>
            <div className={cn(
            `p-1.5 text-white rounded-t-xl font-bold text-lg tracking-wide text-center uppercase`,
            variant === "points" && "bg-orange-400",
            variant === "hearts" && "bg-rose-400"
            )}>
                {variant === "hearts" ? "Hearts Left" : "Total XP"}
            </div>
            <div className={cn
                (`rounded-2xl bg-white items-center 
                flex justify-center font-bold p-6 text-lg`,
                variant === "points" && "text-orange-400",
                variant === "hearts" && "text-rose-400"
            )}>
                <Image
                src={imageSrc}
                alt="Icon"
                height={30}
                width={30}
                className="mr-2"
                />
                {value}
            </div>
        </div>
    );
}

export default ResultCard;