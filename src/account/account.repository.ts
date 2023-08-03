import {db} from '../db'
import { AccountEntiy } from "./account.entity";

export const addAccount = async (account: AccountEntiy)=>{
    return db.collection('accounts').insertOne(account)
}