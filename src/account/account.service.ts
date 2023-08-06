import { UserEntity } from "../user/user.entity";
import { CreateAccountDTO } from "./account.dto";
import {TaskEither} from '../common/Either'
import { AccountEntity, AccountStatus } from "./account.entity";
import { getUseryId } from '../user/user.service'
import { db } from '../db'
import { InsufficeintInitialBalance, NoAccountException, NoUserException } from "./account.exception";

const initialBalanceAllowed = (initialBalance:CreateAccountDTO['balance'])=>{
    return initialBalance > 0
}



export const createAccount = async (dto:CreateAccountDTO, userId:UserEntity['id']):TaskEither<AccountEntity>=>{

    if(!initialBalanceAllowed(dto.balance)){
        return [null, new InsufficeintInitialBalance()]
    }
    const account = new AccountEntity(dto, userId)
    await db.collection<AccountEntity>('accounts').insertOne(account)
    return [account, null]
}

export const getAccountBalance = async (accountId:AccountEntity['id'], userId:UserEntity['id']):TaskEither<AccountEntity['balance']>=>{
    const account = await db.collection<AccountEntity>('accounts').findOne({id:accountId, userId})
    if(!account){
        return [null, new NoAccountException()]
    }
    return [account.balance, null]
}

export const getAcountById = async (id:AccountEntity['id']): Promise<AccountEntity | null>=>{
    return await db.collection<AccountEntity>('accounts').findOne({id})
}

export const updateStatus = async (id:AccountEntity['id'], userId:UserEntity['id'] ,status:AccountStatus): TaskEither<void>=>{
    const result = await db.collection<AccountEntity>('accounts').updateOne({id,userId},{$set:{status}})
    if(!result.matchedCount){
        return [null, new NoAccountException()]
    }
    return [undefined, null]
}

export const accountExists = async (id:AccountEntity['id']):Promise<boolean>=>{
    return await db.collection<AccountEntity>('accounts').countDocuments({id}) > 0
}