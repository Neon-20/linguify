"use client"

import { challenges } from "@/db/schema"
import { challengesOptions } from '../../../db/schema';
import { useState,useTransition } from "react";
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import Header from "./Header";
import QuestionBubble from "./QuestionBubble";
import Challenge from "./ChallengeOpt";
import Footer from "./Footer";
import { upsertChallengeProgress } from "@/actions/challenge-progress";
import { toast } from "sonner";
import { reduceHearts } from "@/actions/user-progress";
import { useAudio } from "react-use";
import Image from "next/image";
import ResultCard from "./result-card";


interface QuizProps{
    initialLessonId:number
    initialLessonChallenges: (typeof challenges.$inferSelect & {
        completed:boolean;
        challengesOptions:typeof challengesOptions.$inferSelect[]
    })[];
    initialHearts:number
    initialPercentage:number
    userSubscription:any //Todo: replace with subscription db type
}

const Quiz = ({
    initialLessonId,
    initialLessonChallenges,
    initialHearts,
    initialPercentage,
    userSubscription
}:QuizProps) => {
    const [hearts,setHearts] = useState(initialHearts);
    const [percentage,setPercentage] = useState(initialPercentage);
    const [challenges] = useState(initialLessonChallenges);
    const [status,setStatus] = useState<"correct" | "wrong" | "none">("none")
    const [selectedOption,setSelectedOption] = useState<number>()
    const [pending,startTransition] = useTransition();
    const [correctAudio,_,correctControl] = useAudio({src:"/correct.wav"})
    const [incorrectAudio,_i,incorrectControl] = useAudio({src:"/incorrect.wav"})
    const [finishAudio,_f,finishControl] = useAudio({src:"/finish.wav"})


    //find current challenge
    const[activeIndex,setActiveIndex] = useState(()=>{
        const unCompletedChallenge = challenges.findIndex((challenge)=>!challenge.completed)
        return unCompletedChallenge === -1 ? 0: unCompletedChallenge;
    })

    const currentChallenge = challenges[activeIndex];//current active challenge
    const options = currentChallenge?.challengesOptions ?? [];


    const onNext = () => {
        setActiveIndex((current)=>current+1);
    }
    const { width, height } = useWindowSize();
    if(true || !currentChallenge){
        finishControl.play();
        return(
        <>
        {finishAudio}
        <Confetti
        width={width}
        height={height}
        recycle={false}
        numberOfPieces={1000}
        />
        <div className="flex flex-col gap-y-4 lg:gap-y-8
        items-center justify-center h-full max-w-lg mx-auto">
            <Image
            src="/finish.svg"
            alt="Finish"
            className="hidden lg:block"
            height={100}
            width={100}
            />
            <Image
            src="/finish.svg"
            alt="Finish"
            className="block lg:hidden"
            height={50}
            width={50}
            />
            <h1 className="text-xl text-center lg:text-3xl
            font-bold text-neutral-700">
                Great Job! <br/>
                You&apos;ve completed the lesson.
            </h1>
            <div className="flex items-center gap-x-4 w-full">
            <ResultCard
            variant="points"
            value={challenges.length * 10}    
            />
            <ResultCard
            variant="hearts"
            value={hearts}    
            />
            </div>
            <Footer
            disabled={pending}
            status={status}
            onCheck={()=> {}}
            />
        </div>
        </>
        )
}

    const title = currentChallenge.type === 'ASSIST'
    ? "Select the correct meaning"
    : currentChallenge.question;


    const onSelect = (id:number)=>{
        if(status !== "none") return
        setSelectedOption(id);
    }
  

    // This function ensures that always onContinue is fired no matter answer wrong or correct.
    const onContinue = () => {
    if(!selectedOption) return;
    if(status === "wrong"){
        setStatus("none");
        setSelectedOption(undefined)
        return;
    }
    if(status === "correct"){
        onNext();
        setStatus("none");
        setSelectedOption(undefined)
        return;
    }
    
    //The time where we neither have correct or wrong status

    const correctOption = options.find((option)=>option.correct);
    if(!correctOption) return;

    if(correctOption && correctOption.id === selectedOption) {
        startTransition(()=>{
            upsertChallengeProgress(currentChallenge.id)
            .then((res)=>{
            if(res?.error){
            toast.error("No hearts found 💔")
            return;
            }
            correctControl.play();
            setStatus("correct")
            setPercentage((prev)=>prev+100/challenges.length)

            if(initialPercentage === 100){
                setHearts((prev)=>Math.min(prev+1,5))
            }
            })  
            .catch(()=>toast.error("Something went wrong"))
        });
    }   

    // if answer is wrong, reduce hearts
    else{
    startTransition(()=>{
        reduceHearts(currentChallenge.id)
        .then((res)=> {
            if(res?.error === "hearts"){
                console.error("Missing hearts");
                return;
            }
            incorrectControl.play()
            setStatus("wrong");
            
            if(!res?.error){
                setHearts((prev)=>Math.max(prev-1,0))
            }
        })
        .catch(()=> toast.error("Something went wrong"));
    })
    }
        
}

    return ( 
        <>
        {incorrectAudio}
        {correctAudio}
            <Header
            hearts={hearts}
            percentage={percentage}
            hasActiveSubscription = {userSubscription}
            />
            <div className="flex-1">
                <div className="h-full justify-center flex items-center">
                    <div className="lg:min-h-[300px] w-full lg:w-[600px]
                    lg:px-0 px-6 flex flex-col gap-y-12">
                    <h1 className="lg:text-3xl text-lg lg:text-start
                    font-bold text-neutral-700 dark:text-neutral-300">
                    {title}
                    </h1>
                    <div>
                    {currentChallenge.type === 'ASSIST' && (
                        <QuestionBubble question={currentChallenge.question}/>
                    )}
                    <Challenge
                    options = {options}
                    onSelect={onSelect}
                    disabled={pending}
                    status={status}
                    selectedOption={selectedOption}
                    type={currentChallenge.type}
                    />
                    </div>
                    </div>
                </div>
            </div>
            <Footer
            disabled={pending || !selectedOption}
            status={status}
            onCheck={onContinue}
            />
        </>
    );
}

export default Quiz;