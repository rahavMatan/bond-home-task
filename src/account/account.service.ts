import { UserEntity } from "../user/user.entity";
import { CreateAccountDTO } from "./account.dto";
import {TaskEither} from '../common/Either'
import { AccountEntiy } from "./account.entity";
import { getUseryId } from '../user/user.service'
import { db } from '../db'
import { InsufficeintInitialBalance, NoAccountException, NoUserException } from "./account.exception";


const userExists = async (userId:UserEntity['id'])=>{
    const user = await getUseryId(userId);
    return !!user
}

const initialBalanceAllowed = (initialBalance:CreateAccountDTO['balance'])=>{
    return initialBalance > 0
}



export const createAccount = async (dto:CreateAccountDTO):TaskEither<AccountEntiy>=>{
    if(! (await userExists(dto.user_id))){
        return [null, new NoUserException()]
    }
    if(!initialBalanceAllowed(dto.balance)){
        return [null, new InsufficeintInitialBalance()]
    }
    const account = new AccountEntiy(dto)
    await db.collection<AccountEntiy>('accounts').insertOne(account)
    return [account, null]
}

export const getAccountBalance = async (id:AccountEntiy['id']):TaskEither<AccountEntiy['balance']>=>{
    const account = await db.collection<AccountEntiy>('accounts').findOne({id})
    if(!account){
        return [null, new NoAccountException()]
    }
    return [account.balance, null]
}

export const getAcountById = async (id:AccountEntiy['id']): Promise<AccountEntiy | null>=>{
    return await db.collection<AccountEntiy>('accounts').findOne({id})
}