import { UUID, randomUUID } from "crypto";
import {UserEntity} from '../user/user.entity'
import {CreateAccountDTO} from './account.dto'

export enum AccountStatus {
    active = "active",
    blocked = "blocked"
}

export class AccountEntiy {
    id:string
    userId:UserEntity['id']
    balance: number
    dailyWithrawLimit:number
    status:AccountStatus
    createdAt: Date
    
    constructor({user_id, balance, dailyWithrawLimit}:CreateAccountDTO){
        this.id = randomUUID()
        this.userId = user_id as UUID;
        this.balance = balance
        this.createdAt = new Date()
        this.status = AccountStatus.active
        this.dailyWithrawLimit = dailyWithrawLimit
    }
}