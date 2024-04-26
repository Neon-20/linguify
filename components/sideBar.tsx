// reusable component

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { SideBarItems } from "./sideBar-items";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { ChevronFirst, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SideBarProps{
    className?:string;
}

const sidebarItems = [
    { href: '/learn', label: 'Learn', iconSrc: '/learn.svg' },
    { href: '/leaderboard', label: 'Leaderboard', iconSrc: '/leaderboard.svg' },
    { href: '/quests', label: 'Quests', iconSrc: '/quests.svg' },
    { href: '/shop', label: 'Shop', iconSrc: '/shop.svg' },
];

export const SideBar = ({
    className 
}:SideBarProps) => {
    return(
        <div className={cn("flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col",className)}>
            <Link href="/">
            <div className="pt-8 pb-7 pl-4 flex items-center gap-x-3">
            <Image
            src="/mascot.svg"
            alt="Mascot"
            height={40} width={40}
            />
            <h1 className="uppercase text-xl font-extrabold text-green-600
            tracking-wide cursor-pointer">
            Linguify
            </h1>
            {/* <Button variant="ghost" size="icon" asChild>
            <Link href="/">
            <ChevronFirst className="h-5 w-5"/>
            </Link>
            </Button> */}
            </div>
            </Link>
            <div className="flex flex-col flex-1 gap-y-4">
            {sidebarItems.map((item,index)=>(
            <SideBarItems
            key={index}
            label={item.label}
            iconSrc={item.iconSrc}
            href={item.href}
            />
            ))}
            </div>
            <div className="py-2">
                <ClerkLoading>
                    <Loader className = "h-5 w-5 text-muted-foreground animate-spin"/>
                </ClerkLoading>
                <ClerkLoaded>
                    <UserButton
                    afterSignOutUrl="/"
                    />
                </ClerkLoaded>
            </div>
        </div>
    )
}