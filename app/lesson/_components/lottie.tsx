"use client";
import animationData from "@/public/celebrate.json";
import Lottie from "lottie-react";
const CelebrateJson = () => {
    return ( 
    <Lottie
        animationData={animationData}
        className="flex items-center justify-center flex-col h-40 -mb-6"
        loop={true}
    /> );
}

export default CelebrateJson;