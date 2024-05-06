import { Create, Datagrid,List,NumberInput,ReferenceInput,required,SelectInput,SimpleForm,TextField, TextInput } from "react-admin";

export const ChallengesCreate = () =>{
    return(
    <Create>
    <SimpleForm>
        <TextInput source="question" validate={[required()]} label="Question"/>
        <SelectInput source="type"
        choices={[
            {
                id:"SELECT",
                name:"SELECT"
            },
            {
                id:"ASSIST",
                name:"ASSIST"
            },
        ]} 
        validate={[required()]}
        />
        <ReferenceInput source="lessonId" reference="lessons"/>
        <NumberInput source="order" validate={[required()]} label="Order" />
    </SimpleForm>
    </Create>
    )
}