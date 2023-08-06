import {db} from '../db'
import { AccountEntity } from "./account.entity";

export const addAccount = async (account: AccountEntity)=>{
    return db.collection('accounts').insertOne(account)
}