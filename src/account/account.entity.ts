import { UUID, randomUUID } from "crypto";
import {UserEntity} from '../user/user.entity'
import {CreateAccountDTO} from './account.dto'

export enum AccountStatus {
    active = "active",
    blocked = "blocked"
}

export class AccountEntity {
    id:string
    userId:UserEntity['id']
    balance: number
    dailyWithrawLimit:number
    status:AccountStatus
    createdAt: Date
    
    constructor({ balance, dailyWithrawLimit}:CreateAccountDTO, userId:UserEntity['id']){
        this.id = randomUUID()
        this.userId = userId
        this.balance = balance
        this.createdAt = new Date()
        this.status = AccountStatus.active
        this.dailyWithrawLimit = dailyWithrawLimit
    }
}