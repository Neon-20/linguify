import { relations } from "drizzle-orm";
import { integer, pgEnum, pgTable,serial,text,boolean, timestamp } from "drizzle-orm/pg-core";


export const courses = pgTable("courses",{
    id:serial("id").primaryKey(),
    title:text("title").notNull(),
    imageSrc:text("imageSrc").notNull(),
})

export const courseRelations = relations(courses,({many}) => ({
    userProgress:many(userProgress),
    //One course can have many units
    units:many(units),
}))

export const userProgress = pgTable("user_Progress",{
    userId:text("user_id").primaryKey(),
    userName:text("user_name").notNull().default("User"),
    userImageSrc:text("user_image_src").notNull().default("/mascot.svg"),
    activeCourseId:integer("active_course_id").references(()=>courses.id,{onDelete:"cascade"}).notNull(),
    hearts:integer("hearts").notNull().default(5),
    points:integer("points").notNull().default(0),
})

export const userProgressRelations = relations(userProgress,({one})=>({
    activeCourse:one(courses,{
        fields:[userProgress.activeCourseId],
        references:[courses.id]
    })
}))

//Related to courses

export const units = pgTable("units",{
    id:serial("id").primaryKey(),
    title:text("title").notNull(),
    description:text("description").notNull(),
    courseId:integer("course_id").references(() => courses.id,{
        onDelete:"cascade"
    }).notNull(),
    order:integer("order").notNull(),
})

export const unitRelations = relations(units,({many,one})=>({
    course:one(courses,{
        fields:[units.courseId],
        references:[courses.id],
    }),
    lessons:many(lessons)
}))


export const lessons = pgTable("lessons",{
    id:serial("id").primaryKey(),
    title:text("title").notNull(),
    unitId:integer("unit_id").references(() => units.id,{onDelete:"cascade"}).notNull(),
    order:integer("order").notNull(),
})

export const lessonsRelations = relations(lessons,({one,many})=>({
    units:one(units,{
        fields:[lessons.unitId],
        references:[units.id]
    }),
    challenges:many(challenges)
}))

//To create a type of a challenge best to create enums
export const challengeEnum = pgEnum("type",["SELECT","ASSIST"])

export const challenges = pgTable("challenges",{
    id:serial("id").primaryKey(),
    lessonId:integer("lesson_id").references(() => lessons.id,{onDelete:"cascade"}).notNull(),
    type:challengeEnum("type").notNull(),
    question:text("question").notNull(),
    order:text("order").notNull(),
})

export const challengesRelations = relations(challenges,({one,many})=>({
    lesson:one(lessons,{
        fields:[challenges.lessonId],
        references:[lessons.id]
    }),
    challengesOptions:many(challengesOptions),
    challengesProgress:many(challengesProgress),
}))

export const challengesOptions = pgTable("challenges_options",{
    id:serial("id").primaryKey(),
    challengeId:integer("challenge_id").references(() => challenges.id,{onDelete:"cascade"}).notNull(),
    text:text("text").notNull(),
    correct:boolean("correct").notNull(),
    imageSrc:text("image_src").notNull(),
    audioSrc:text("audio_src").notNull(),
})

export const challengesOptionsRelations = relations(challengesOptions,({one})=>({
    challenge:one(challenges,{
        fields:[challengesOptions.challengeId],
        references:[challenges.id]
    })
}))


export const challengesProgress = pgTable("challenges_progress",{
    id:serial("id").primaryKey(),
    userId:text("user_id").notNull(),
    challengeId:integer("challenge_id").references(() => challenges.id,{onDelete:"cascade"}).notNull(),
    completed:boolean("completed").notNull().default(false),
})

export const challengesProgressRelations = relations(challengesProgress,({one})=>({
    challenge:one(challenges,{
        fields:[challengesProgress.challengeId],
        references:[challenges.id]
    })
}))


export const userSubscription = pgTable("user_subscription",{
    id:serial("id").primaryKey(),
    userId:text("user_id").notNull().unique(),
    stripeCustomerId:text("stripe_customer_id").notNull().unique(),
    stripeSubscriptionId:text("stripe_subscription_id").notNull().unique(),
    stripePriceId:text("stripe_price_id").notNull(),
    stripeCurrentPeriodEnd:timestamp("stripe_current_period_end").notNull()

})
