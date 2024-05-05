import { challenges, challengesOptions } from "@/db/schema"
import { cn } from "@/lib/utils";
import CardLesson from "./CardLesson";

interface ChallengeProps{
    options: typeof challengesOptions.$inferSelect[];
    onSelect: (id:number) => void;
    disabled?:boolean
    status:"correct" | "wrong" | "none"
    selectedOption?:number
    type: typeof challenges.$inferSelect["type"];
}

const Challenge = ({
    options,
    onSelect,
    disabled,
    status,
    selectedOption,
    type
}:ChallengeProps) => {
    return(
        <div className=
        {cn("grid gap-2",
            type === "ASSIST" && "grid-cols-1",
            type === "SELECT" && "grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]"
        )}
        >
        {options.map((option,index)=>(
            <CardLesson
            type={type}
            key={option.id}
            id={option.id}
            imageSrc={option.imageSrc}
            audioSrc={option.audioSrc}
            shortcut = {`${index+1}`}
            text= {option.text}
            selected = {selectedOption === option.id}
            onClick={()=>onSelect(option.id)}
            disabled={disabled}
            status={status}
            />
        ))}
        </div>
    )
}   
export default Challenge;