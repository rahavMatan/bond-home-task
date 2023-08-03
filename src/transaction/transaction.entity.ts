import { randomUUID } from 'crypto'
import {AccountEntiy} from '../account/account.entity'

import {CreateTransactionDTO } from './transaction.dto'

export enum TransactionType {
    withdraw = "withdraw",
    deposit = "deposit"
}

export class TransactionEntity {
    id:string
    accountId:AccountEntiy['id']
    value:number
    createdAt:Date
    type: TransactionType
    constructor({value, type}:CreateTransactionDTO, accountId:AccountEntiy['id']) {
        this.id = randomUUID()
        this.createdAt = new Date()
        this.type = type
        this.value = value
        this.accountId = accountId
    }
}