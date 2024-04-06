"use client";
import animationData from "@/public/duolingo.json";
import Lottie from "lottie-react";
const LottieJson = () => {
    return ( 
    <Lottie
        animationData={animationData}
        className="flex items-center justify-center flex-col h-40"
        loop={true}
    /> );
}

export default LottieJson;