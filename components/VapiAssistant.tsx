"use client"
import Vapi from "@vapi-ai/web";
import { useState, useEffect } from "react";
import { HoverBorderGradient } from "./hover-border-gradient";
import { Mic } from "lucide-react";
import { Tooltip, TooltipProvider } from "./ui/tooltip";


export const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_API!);
  
export default function VapiAssistant() {
  const [callStatus, setCallStatus] = useState("inactive");
  
  const start = async () => { 
    setCallStatus("loading");
    const response = vapi.start(process.env.NEXT_PUBLIC_ASSISTANT_ID!);
  };

  const stop = () => {
    setCallStatus("loading");
    vapi.stop();
  };
//@ts-ignore
  useEffect(() => {
    vapi.on("call-start", () => setCallStatus("active"));
    vapi.on("call-end", () => setCallStatus('inactive'));
    
    return () => vapi.removeAllListeners();
  }, [])
  
  return (
    <div className="flex justify-center text-center">
      <div className="tooltip">
      <div className="tooltiptext">Please Use Responsibly 🙂</div>
      <HoverBorderGradient
        containerClassName="rounded-full"
        as="button"
        className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 cursor-pointer"
      >
        <Mic className="h-5 w-5 mr-1"/>
      {callStatus === "inactive" ? (
      <span onClick={start}>
        Give it a try
        </span>
      ) : null}
      {callStatus === "loading" ? <span className="animate-pulse">One Sec..</span> : null}
      {callStatus === "active" ? (<span  onClick={stop}>Press to Stop</span>) : null}
      </HoverBorderGradient>
      </div>
    </div>
  );
}