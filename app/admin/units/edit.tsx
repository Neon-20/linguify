import {Edit,List,NumberInput,ReferenceInput,required,SimpleForm,TextField, TextInput } from "react-admin";

export const UnitsEdit = () =>{
    return(
    <Edit>
    <SimpleForm>
        <NumberInput source="id" validate={[required()]} label="Id"/>
        <TextInput source="title" validate={[required()]} label="Title"/>
        <TextInput source="description" validate={[required()]} label="Description"/>
        <ReferenceInput source="courseId" reference="courses"/>
        <NumberInput
        source="order"
        validate={[required()]}
        label="Order"
        />
    </SimpleForm>
    </Edit>
    )
}