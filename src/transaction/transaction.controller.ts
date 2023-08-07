import express, { RequestHandler } from "express";
import { getTransactions, createTransaction } from './transaction.service'
import { validateRequestBody, validateRequestQuery } from "zod-express-middleware";
import { GetTransactionDTO, createTransactionDTO, getTransactionDTO } from "./transaction.dto";

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
    const {fromDate, toDate} = req.query
    const [transactions, error] = await getTransactions(account_id, {fromDate, toDate} as GetTransactionDTO)
    if(error){
        return next(error)
    }
    res.json({transactions})
}

transactionRouter.get('/transactions', validateRequestQuery(getTransactionDTO), getTrasnactionsHandler)
transactionRouter.post('/transactions', validateRequestBody(createTransactionDTO) ,createTransactionHandler)