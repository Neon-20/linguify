import { BooleanField, Datagrid,List,NumberField,ReferenceField,SelectField,TextField } from "react-admin";

export const ChallengesOptionsList = () =>{
    return(
    <List>
    <Datagrid rowClick = "edit">
        <NumberField source="id"/>
        <TextField source="text"/>
        <BooleanField source="correct"/>
        <ReferenceField source="challengeId" reference="challenges"/>
        <TextField source="audioSrc"/>
        <TextField source="imageSrc"/>
        <NumberField source="order"/>
    </Datagrid>
    </List>
    )
}