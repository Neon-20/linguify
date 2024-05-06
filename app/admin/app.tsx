"use client"
import {Admin, Resource} from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import { CourseList } from "./courses/list";
import { CourseCreate } from "./courses/create";
import { CourseEdit } from "./courses/edit";
import { UnitsList } from "./units/list";
import { UnitsCreate } from "./units/create";
import { UnitsEdit } from "./units/edit";
import { LessonsList } from "./lesson/list";
import { LessonsCreate } from "./lesson/create";
import { LessonsEdit } from "./lesson/edit";
import { ChallengesList } from "./challenges/list";
import { ChallengesCreate } from "./challenges/create";
import { ChallengesEdit } from "./challenges/edit";
import { ChallengesOptionsList } from "./challengesOptions/list";
import { ChallengesOptionsCreate } from "./challengesOptions/create";
import { ChallengesOptionsEdit } from "./challengesOptions/edit";

const dataProvider = simpleRestProvider("/api");

const App = () => {
    return ( 
        <Admin dataProvider = {dataProvider}>   
        <Resource
        name="courses"
        list={CourseList}
        create={CourseCreate}
        edit={CourseEdit}
        recordRepresentation="title"
        />
        <Resource
        name="units"
        list={UnitsList}
        create={UnitsCreate}
        edit={UnitsEdit}
        recordRepresentation="title"
        />
        <Resource
        name="lessons"
        list={LessonsList}
        create={LessonsCreate}
        edit={LessonsEdit}
        recordRepresentation="title"
        />
        <Resource
        name="challenges"
        list={ChallengesList}
        create={ChallengesCreate}
        edit={ChallengesEdit}
        recordRepresentation="question"
        />
        <Resource
        name="challengesOptions"
        list={ChallengesOptionsList}
        create={ChallengesOptionsCreate}
        edit={ChallengesOptionsEdit}
        recordRepresentation="text"
        />
            Admin?
        </Admin>
    );
}

export default App;
