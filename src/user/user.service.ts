import { TaskEither } from "../common/Either"
import { CreateUserDTO } from "./user.dto"
import { UserEntity } from "./user.entity"
import { UnderAgeException } from "./user.exception"
import { db } from '../db'

const isLegalAge = (birthDay:CreateUserDTO['birthDate'])=>{
    const today = new Date()
    const age = today.getFullYear() - new Date(birthDay).getFullYear()
    return age >= 18
}

export const createUser = async (userDTO:CreateUserDTO):TaskEither<UserEntity>=>{
    if(!isLegalAge(userDTO.birthDate)){
        return [null, new UnderAgeException()]
    }
    const user:UserEntity = new UserEntity(userDTO)
    await db.collection('users').insertOne(user)
    return [user,null]
}

export const getUseryId = async (id:UserEntity['id']):Promise<UserEntity | null>=>{
    return db.collection<UserEntity>('users').findOne({id})
}