"use client";
import animationData from "@/public/shop.json";
import Lottie from "lottie-react";
const ShopJson = () => {
    return ( 
    <Lottie
        animationData={animationData}
        className="flex items-center justify-center flex-col h-52 -mt-6 -mb-12"
        loop={true}
    /> );
}

export default ShopJson;