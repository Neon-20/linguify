"use client";
import animationData from "@/public/connect.json";
import Lottie from "lottie-react";
const ConnectJson = () => {
    return ( 
    <Lottie
        animationData={animationData}
        className="flex ml-auto mr-8 mt-44 items-center justify-center flex-col h-px] w-[500px]"
        loop={true}
    /> );
}

export default ConnectJson;