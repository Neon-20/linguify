import {auth} from "@clerk/nextjs";

const allowedIds = [
    "user_2egY1XnJuT5C9JUjr32CeUS38u2"
]

export const IsAdmin = async () => {
    const {userId} = await auth();
    if(!userId) return false;
    return allowedIds.includes(userId);
}