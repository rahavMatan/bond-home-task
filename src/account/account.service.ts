import { UserEntity } from "../user/user.entity";
import { CreateAccountDTO } from "./account.dto";
import {TaskEither} from '../common/Either'
import { AccountEntiy } from "./account.entity";
import { getUseryId } from '../user/user.service'
import { db } from '../db'
import { InsufficeintInitialBalance, NoUserException } from "./account.exception";
import { UUID } from "crypto";

const userExists = async (userId:UserEntity['id'])=>{
    const user = await getUseryId(userId);
    return !!user
}

const initialBalanceAllowed = (initialBalance:CreateAccountDTO['balance'])=>{
    return initialBalance > 0
}



export const createAccount = async (dto:CreateAccountDTO):TaskEither<AccountEntiy>=>{
    if(! (await userExists(dto.user_id as UUID))){
        return [null, new NoUserException()]
    }
    if(!initialBalanceAllowed(dto.balance)){
        return [null, new InsufficeintInitialBalance()]
    }
    const account = new AccountEntiy(dto)
    await db.collection('accounts').insertOne(account)
    return [account, null]
}