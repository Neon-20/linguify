import { getCourses } from "@/db/queries";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google"
import { List } from "./_components/List";


const font = Poppins({ subsets: ["latin"], weight: ["600"] })

const CoursesPage = async() => {
    const courses = await getCourses();
    return ( 
        <div className="h-full max-w-[912px] mx-auto px-3">
        <h1 className={cn("text-neutral-600 tracking-wide text-2xl font-bold",font.className)}>
        Language courses
        </h1>
        <List    
        courses={courses}
        activeCourseId={1}
        />
        </div>
    );
}

export default CoursesPage;