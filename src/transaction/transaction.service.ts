import {AccountEntity, AccountStatus} from '../account/account.entity'
import { TaskEither } from '../common/Either'
import { TransactionEntity, TransactionType } from './transaction.entity'
import {db, client} from '../db'
import { CreateTransactionDTO, GetTransactionDTO } from './transaction.dto'
import { AccountBlockedException, DailyWithrawLimitExceeded, InsuficientFundsException } from './transaction.exception'
import {Filter} from 'mongodb'

export const getTransactions = async (
    accountId:AccountEntity['id'],
    params:GetTransactionDTO
    ):TaskEither<TransactionEntity[]>=>{

    const query:Filter<TransactionEntity> = { 
        accountId, 
    }
    if(params.fromDate || params.toDate){
        query.createdAt = {
            $gte: params.fromDate ? new Date(params.fromDate) : undefined,
            $lt: params.toDate ? new Date(params.toDate) : undefined 

        }
    }
    const transactions = await db.collection<TransactionEntity>('transactions').find(query, {ignoreUndefined: true}).toArray()
    return [transactions, null]
}

export const createTransaction = async (
    transactionDto:CreateTransactionDTO, 
    accountId:AccountEntity['id']
    ): TaskEither<TransactionEntity>=> {
    const account = await db.collection<AccountEntity>('accounts').findOne({id: accountId})
    if(account?.status === AccountStatus.blocked){
        return [null, new AccountBlockedException()]
    }
    if(transactionDto.type === TransactionType.deposit){
        return await handleDeposit(transactionDto, account!.id)
    }
    return await handleWithdrawal(transactionDto, account!)
}

const handleDeposit = async (dto:CreateTransactionDTO, accountId:AccountEntity['id']):TaskEither<TransactionEntity>=>{
    const session = client.startSession();
    const trans = new TransactionEntity(dto,accountId)
    try {
        // await session.startTransaction();
        await db.collection<AccountEntity>('accounts').updateOne({id:accountId},{$inc:{balance:dto.value}},{session})
        await db.collection<TransactionEntity>('transactions').insertOne(trans,{session})
        return [trans, null]
    } catch(e){
        console.error(e)
        // session.abortTransaction()
        return [null, e as Error]
    } 
    finally {
        await session.endSession();
    }
}

const getWithdrawlsByDay = async (accountId:AccountEntity['id'], day:Date)=>{
    const start = new Date(day);
    start.setHours(0,0,0,0);

    const end = new Date(day);
    end.setHours(23,59,59,999);

    return await db
        .collection<TransactionEntity>('transactions')
        .find({
            accountId, 
            type:TransactionType.withdraw, 
            createdAt:{ $gte: start, $lt: end }
        })
        .toArray()
}

const handleWithdrawal = async (dto:CreateTransactionDTO, account:AccountEntity):TaskEither<TransactionEntity>=>{
    if(dto.value > account.balance){
        return [null, new InsuficientFundsException()]
    }

    const todayWithdrawls = await getWithdrawlsByDay(account.id, new Date())
    const totalWithdrawl = todayWithdrawls.reduce((acc, transaction)=>{
        return acc + transaction.value
    },0)

    if(totalWithdrawl + dto.value >= account.dailyWithrawLimit){
        return [null, new DailyWithrawLimitExceeded()]
    }
    const session = client.startSession();
    try {
        // await session.startTransaction();
        const transaction = new TransactionEntity(dto,account.id)
        await db.collection<AccountEntity>('accounts').updateOne({id:account.id},{$inc:{balance:dto.value * -1}},{session})
        await db.collection<TransactionEntity>('transactions').insertOne(transaction,{session})
        return [transaction, null]
    } catch(e){
        console.error(e)
        // session.abortTransaction()
        return [null, e as Error]
    } 
    finally {
        await session.endSession();
    }

}