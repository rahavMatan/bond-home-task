import { CreateUserDTO } from "./user.dto"

const isLegalAge = (userAge:Date)=>{
    const today = new Date()
    const age = today.getFullYear() - userAge.getFullYear()
    return age >= 18
}

export const createUser = (userDTO:CreateUserDTO)=>{

}