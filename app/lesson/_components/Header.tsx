import { ModeToggle } from "@/components/mode-toggle";
import { Progress } from "@/components/ui/progress";
import { useExitModal } from "@/store/use-exit-modal";
import { Infinity, InfinityIcon, X } from "lucide-react";
import Image from "next/image";

interface HeaderProps{
    hearts:number;
    percentage:number;
    hasActiveSubscription:boolean
}

const Header = ({
    hearts,
    percentage,
    hasActiveSubscription
}:HeaderProps) => {
    const {open}  = useExitModal();

    return ( 
        <div className="lg:pt-[50px] pt-[20px] max-w-[1140px]
        items-center justify-between mx-auto px-10 flex gap-x-7 w-full">
        <X
        onClick={open} //Todo:Add exit modal
        className="text-slate-500 hover:opacity-75 transition cursor-pointer"
        />
        <Progress value={percentage}/>
        <div className="text-rose-500 font-bold flex items-center">
        <Image
        src="/heart.svg"
        height={28}
        width={28}
        alt="Heart"
        className="mr-2 cursor-pointer"
        />
    {hasActiveSubscription 
        ? <Infinity className="h-6 w-6 shrink-0 stroke-[3]"/> : hearts
    }
    </div>
    <div className="ml-4">
    <ModeToggle/>
    </div>
        
        </div>
    );
}

export default Header;