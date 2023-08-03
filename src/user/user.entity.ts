import {UUID, randomUUID} from 'crypto'
import { CreateUserDTO } from './user.dto'

export class UserEntity {
    id: string
    birthDate: Date
    name: string

    constructor({name,birthDate}:CreateUserDTO){
        this.id = randomUUID()
        this.birthDate = new Date(birthDate)
        this.name = name 
    }
}