"use client";
import animationData from "@/public/duo.json";
import Lottie from "lottie-react";
const DuoLottie = () => {
    return ( 
    <Lottie
        animationData={animationData}
        className="h-20 flex items-center"
        loop={true}
    /> );
}

export default DuoLottie;