import {UUID, randomUUID} from 'crypto'
import { CreateUserDTO } from './user.dto'

export class UserEntity {
    id: UUID
    birthDate: Date
    name: string

    constructor({name,birthDate}:CreateUserDTO){
        this.id = randomUUID()
        this.birthDate = birthDate
        this.name = name 
    }
}