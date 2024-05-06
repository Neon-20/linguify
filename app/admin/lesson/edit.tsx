import { Create, Datagrid,Edit,List,NumberInput,ReferenceInput,required,SimpleForm,TextField, TextInput } from "react-admin";

export const LessonsEdit = () =>{
    return(
    <Edit>
    <SimpleForm>
        <TextInput source="title" validate={[required()]} label="Title"/>
        <ReferenceInput source="unitId" reference="units"/>
        <NumberInput
        source="order"
        validate={[required()]}
        label="Order"
        />
    </SimpleForm>
    </Edit>
    )
}