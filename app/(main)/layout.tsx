import { MobileHeader } from "@/components/mobile-header";
import { SideBar } from "@/components/sideBar";

interface Props{
    children:React.ReactNode
}

const MainLayout = ({
    children
}:Props) => {
    return ( 
        <>
        <MobileHeader/>
        <SideBar className="hidden lg:flex"/>
        <main className="lg:pl-[256px] h-full pt-[50px] lg:pt-0">
            <div className="max-w-[1056px] mx-auto p-6 h-full">
            {children}
            </div>
        </main>
        </>
    );
}

export default MainLayout;