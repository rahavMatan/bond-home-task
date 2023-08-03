import express, { RequestHandler } from "express"
import { validateRequestBody } from "zod-express-middleware"
import {createAccountDTO} from './account.dto'
import {createAccount} from './account.service'

const createAccountHandler:RequestHandler = async (req,res, next)=>{
    const [account, error] = await createAccount(req.body)
    if(error){
        return next(error)
    }
    res.json({account})
}

export const accountRouter = express.Router()

accountRouter.post('/accounts', validateRequestBody(createAccountDTO), createAccountHandler)