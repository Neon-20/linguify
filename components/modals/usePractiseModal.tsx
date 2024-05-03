"use client";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import Image from "next/image";
import { Button } from "../ui/button";
import { usePractiseModal } from "@/store/use-practice-modal";

const PractiseModal = () => {
    const[isClient,setIsClient] = useState<boolean>(false)
    const {isOpen,close,open} = usePractiseModal();

    //Doing this to avoid hydration errors
    // mounting the component
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
                src="/heart.svg"
                alt="Heart"
                height={80}
                width={80}
                />
                <Image
                src="/points.svg"
                alt="Point"
                height={80}
                width={80}
                />
                </div>
                <DialogTitle className="text-center
                font-bold text-2xl">
                Practise Lesson.
                </DialogTitle>
                <DialogDescription className="text-center text-base">
                Use practise lesson to regain hearts and points, you can&apos;t 
                loose it here.
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <div className="flex flex-col gap-y-3 w-full">
                <Button variant="primary" size="default" className="w-full"
                onClick={close}>
                    I understand!
                </Button>
                </div>
            </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default PractiseModal;