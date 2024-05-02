import { getCourses, getUserProgress } from "@/db/queries";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google"
import { List } from "./_components/List";


const font = Poppins({ subsets: ["latin"], weight: ["600"] })

const CoursesPage = async() => {
    const coursesPromise = getCourses();
    const userProgressPromise = getUserProgress();
    
    const [courses,userProgress] = await Promise.all([coursesPromise,userProgressPromise]);

    return ( 
        <div className="h-full max-w-[912px] mx-auto px-3">
        <h1 className={cn("dark:text-slate-200 text-neutral-600 tracking-wide text-2xl font-bold",font.className)}>
        Language courses
        </h1>
        <List    
        courses={courses}
        activeCourseId={userProgress?.activeCourseId}
        />
        </div>
    );
}

export default CoursesPage;