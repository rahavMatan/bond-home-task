import { randomUUID } from 'crypto'
import {AccountEntity} from '../account/account.entity'

import {CreateTransactionDTO } from './transaction.dto'

export enum TransactionType {
    withdraw = "withdraw",
    deposit = "deposit"
}

export class TransactionEntity {
    id:string
    accountId:AccountEntity['id']
    value:number
    createdAt:Date
    type: TransactionType
    constructor({value, type}:CreateTransactionDTO, accountId:AccountEntity['id']) {
        this.id = randomUUID()
        this.createdAt = new Date()
        this.type = type
        this.value = value
        this.accountId = accountId
    }
}