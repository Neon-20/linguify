"use client";

import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";

interface SideBarItemsProps{
    label:string,
    iconSrc:string,
    href:string
}

export const SideBarItems = ({
    label,
    iconSrc,
    href
}:SideBarItemsProps) => {
//usePathname to manage the routes whether active or not

const pathname = usePathname();
const active = pathname === href;

    return(
        <Button
        variant={active ? 'sidebarOutline':'sidebar'}
        className="justify-start h-[52px]"
        asChild
        >
            <Link href={href}>
            {label}
            <Image
            src={iconSrc}   
            alt="label"
            className="ml-auto"
            height={32}
            width={32}
            />
            </Link>
        </Button>
    )
}