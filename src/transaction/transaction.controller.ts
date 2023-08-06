import express, { RequestHandler } from "express";
import { getTransactions, createTransaction } from './transaction.service'
import { validateRequestBody } from "zod-express-middleware";
import { createTransactionDTO } from "./transaction.dto";

export const transactionRouter = express.Router({ mergeParams: true })

const createTransactionHandler:RequestHandler = async (req,res,next)=>{
    const {account_id} = req.params
    const [transaction, error] = await createTransaction(req.body, account_id)
    if(error){
        return next(error)
    }
    res.json({transaction})
}

const getTrasnactionsHandler:RequestHandler = async (req,res,next)=>{
    const {account_id} = req.params
    const [transactions, error] = await getTransactions(account_id)
    if(error){
        return next(error)
    }
    res.json({transactions})
}

transactionRouter.get('/transactions', getTrasnactionsHandler)
transactionRouter.post('/transactions', validateRequestBody(createTransactionDTO) ,createTransactionHandler)