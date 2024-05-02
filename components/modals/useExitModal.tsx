"use client";
import { useExitModal } from "@/store/use-exit-modal";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import Image from "next/image";
import { Button } from "../ui/button";

const ExitModal = () => {
    const router = useRouter();
    const[isClient,setIsClient] = useState<boolean>(false)
    const {isOpen,close,open} = useExitModal();

    //Doing this to avoid hydration errors
    useEffect(()=>{
        setIsClient(true);
    },[])
    if(!isClient){
        return null;
    }

//  isOpen and close are states from zustand
    return ( 
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="max-w-md mx-auto">
            <DialogHeader>
                <div className="items-center justify-center flex w-full mb-5">
                <Image
                src="mascot_sad.svg"
                alt="Mascot"
                height={80}
                width={80}
                />
                </div>
                <DialogTitle className="text-center
                font-bold text-2xl">
                Wait don&apos;t go!!!
                </DialogTitle>
                <DialogDescription className="text-center text-base">
                You&apos;re about to leave the lesson. Are you sure?
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <div className="flex flex-col gap-y-3 w-full">
                <Button variant="primary" size="default" className="w-full"
                onClick={close}>
                    Keep Learning
                </Button>
                <Button variant="dangerOutline" size="default" className="w-full"
                onClick={()=>{
                    close();
                    router.push("/learn")
                }}>
                    End Session
                </Button>
                </div>
            </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default ExitModal;