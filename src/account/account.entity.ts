import { UUID } from "crypto";
import {UserEntity} from '../user/user.entity'
import {CreateAccountDTO} from './account.dto'

export enum AccountStatus {
    active = "active",
    blocked = "blocked"
}

export class AccountEntiy {
    id:UUID
    user_id:UserEntity['id']
    balance: number
    dailyWithrawLimit:number
    status:AccountStatus
    createdAt: Date
    
    constructor({user_id, balance}:CreateAccountDTO){
        this.user_id = user_id as UUID;
        this.balance = balance
    }
}