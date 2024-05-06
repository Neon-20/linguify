import { BooleanInput, Create, Datagrid,List,NumberInput,ReferenceInput,required,SelectInput,SimpleForm,TextField, TextInput } from "react-admin";

export const ChallengesOptionsCreate = () =>{
    return(
    <Create>
    <SimpleForm>
        <TextInput source="text" validate={[required()]} label="Text"/>
        <BooleanInput source="correct" label="Correct Option"/>
        <ReferenceInput source="challengeId" reference="challenges"/>
        <TextInput source="audioSrc" label = "Add audio URL"/>
        <TextInput source="imageSrc" label = "Add image URL"/>
    </SimpleForm>
    </Create>
    )
}