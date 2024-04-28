import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle, CheckCircle2, CheckCircle2Icon } from "lucide-react";
import { useKey, useMedia } from "react-use";

interface FooterProps{
    disabled?:boolean;
    status: "correct" | "wrong" | "none" | "completed";
    onCheck:() => void
    lessondId?:boolean
}

const Footer = ({
    disabled,
    status,
    onCheck,
    lessondId
}:FooterProps) => {
    useKey("Enter",onCheck,{},[onCheck])
    const isMobile = useMedia("(max-width:1024px)");

    // Navigate through using key bindings
    return ( 
        <footer className={cn("lg:h-[120px] h-[100px] border-t-2",
        status === "correct" && "border-transparent bg-green-100",
        status === "wrong" && "border-transparent bg-rose-100",
        )}>
        <div className="max-w-[1040px] h-full mx-auto 
        flex items-center justify-between px-6 lg:px-10">
            {status === "correct" && (
                <div className="text-green-500 text-base font-bold
                lg:text-2xl flex items-center">
                    <CheckCircle2 className="h-6 w-6 lg:h-10 lg:w-10 mr-4"/>
                    Nicely Done!
                </div>
            )}
            <Button
            disabled={disabled}
            className="ml-auto"
            onClick={onCheck}
            size={isMobile ? "sm" : "lg"}
            variant={status === "wrong" ? "danger" : "secondary"}
            >
                {status === "none" && "Check"}
                {status === "correct" && "Next"}
                {status === "wrong" && "Retry"}
                {status === "completed" && "Continue"}
            </Button>
        </div>
        </footer>
    );
}

export default Footer;