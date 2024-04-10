
import {
    Sheet,
    SheetContent,
    SheetTrigger
}
from "@/components/ui/sheet";
import { SideBar } from "./sideBar";
import { MenuIcon } from "lucide-react";

export const MobileSideBar = () => {
  return(
    <Sheet>
      <SheetTrigger>
        <MenuIcon className="text-white"/>
      </SheetTrigger>
        <SheetContent className='p-0 z-[100]' side="left">
        <SideBar/>
        </SheetContent>
    </Sheet>
  )
}