import {db} from '../db'
import { UserEntity } from './user.entity'

export const addUser = async (user:UserEntity)=>{
    return db.collection('users').insertOne(user)
}