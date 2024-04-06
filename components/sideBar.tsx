// reusable component

import { cn } from "@/lib/utils";

interface SideBarProps{
    className?:string;
}

export const SideBar = ({
    className 
}:SideBarProps) => {
    return(
        <div className={cn("flex bg-blue-500 h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col",className)}>
            SideBar here
        </div>
    )
}