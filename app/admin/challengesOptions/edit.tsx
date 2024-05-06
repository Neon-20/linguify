import { Edit,BooleanInput, Create, Datagrid,List,NumberInput,ReferenceInput,required,SelectInput,SimpleForm,TextField, TextInput } from "react-admin";

export const ChallengesOptionsEdit = () =>{
    return(
    <Edit>
    <SimpleForm>
        <TextInput source="text" validate={[required()]} label="Text"/>
        <BooleanInput source="correct" label="Correct Option"/>
        <ReferenceInput source="challengeId" reference="challenges"/>
        <TextInput source="audioSrc" label = "Add audio URL"/>
        <TextInput source="imageSrc" label = "Add image URL"/>
    </SimpleForm>
    </Edit>
    )
}