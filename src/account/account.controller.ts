import express, { RequestHandler } from "express"
import { validateRequestBody } from "zod-express-middleware"
import {createAccountDTO} from './account.dto'
import {createAccount, getAccountBalance} from './account.service'

const createAccountHandler:RequestHandler = async (req,res, next)=>{
    const [account, error] = await createAccount(req.body)
    if(error){
        return next(error)
    }
    res.json({account})
}

const getBalanceHandler:RequestHandler = async (req,res,next)=>{
    const [balance, error] = await getAccountBalance(req.params.account_id)
    if(error){
       return  next(error)
    }
    res.json({balance})
} 

export const accountRouter = express.Router()

accountRouter.post('/accounts', validateRequestBody(createAccountDTO), createAccountHandler)

accountRouter.get('/accounts/:account_id/balance', getBalanceHandler)