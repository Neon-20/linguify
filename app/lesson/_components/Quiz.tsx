"use client"

import { challenges } from "@/db/schema"
import { challengesOptions } from '../../../db/schema';
import { useState } from "react";
import Header from "./Header";
import QuestionBubble from "./QuestionBubble";
import Challenge from "./ChallengeOpt";
import Footer from "./Footer";


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
    const[status,setStatus] = useState<"correct" | "wrong" | "none">("none")
    const[selectedOption,setSelectedOption] = useState<number>()

    //find current challenge
    const[activeIndex,setActiveIndex] = useState(()=>{
        const unCompletedChallenge = challenges.findIndex((challenge)=>!challenge.completed)
        return unCompletedChallenge === -1 ? 0: unCompletedChallenge;
    })

    const currentChallenge = challenges[activeIndex];//current active challenge
    const options = currentChallenge?.challengesOptions ?? [];

    const title = currentChallenge.type === 'ASSIST'
    ? "Select the correct meaning"
    : currentChallenge.question;

    const onSelect = (id:number)=>{
        if(status !== "none") return
        setSelectedOption(id);
    }

    return ( 
        <>
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
                    disabled={false}
                    status={status}
                    selectedOption={selectedOption}
                    type={currentChallenge.type}
                    />
                    </div>
                    </div>
                </div>
            </div>
            <Footer
            disabled={!selectedOption}
            status={status}
            onCheck={()=>{}}
            />
        </>
    );
}

export default Quiz;