import { MobileSideBar } from "./mobileSidebar"

export const MobileHeader = () => {
    return(
        <nav 
        className="lg:hidden px-6 top-0 w-full bg-green-500
        h-[50px] flex items-center border-b fixed z-50">
        <MobileSideBar/>
        </nav>
    )
}