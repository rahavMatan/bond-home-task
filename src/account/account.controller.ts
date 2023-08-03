import express, { RequestHandler } from "express"
import { validateRequestBody } from "zod-express-middleware"
import {createAccountDTO, updateStatusDTO} from './account.dto'
import {createAccount, getAccountBalance, updateStatus} from './account.service'

const createAccountHandler:RequestHandler = async (req,res, next)=>{
    const [account, error] = await createAccount(req.body)
    if(error){
        return next(error)
    }
    res.status(201).json({account})
}

const getBalanceHandler:RequestHandler = async (req,res,next)=>{
    const [balance, error] = await getAccountBalance(req.params.account_id)
    if(error){
       return  next(error)
    }
    res.json({balance})
} 

const updateStatusHandler:RequestHandler = async (req,res,next)=>{
    const [, error] = await updateStatus(req.params.account_id, req.body.status)
    if(error){
       return  next(error)
    }
    res.status(200).send()
} 

export const accountRouter = express.Router()

accountRouter.post('/accounts', validateRequestBody(createAccountDTO), createAccountHandler)

accountRouter.put('/accounts/:account_id/status', validateRequestBody(updateStatusDTO), updateStatusHandler)


accountRouter.get('/accounts/:account_id/balance', getBalanceHandler)