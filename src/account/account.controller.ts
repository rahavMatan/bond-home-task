import express, { RequestHandler } from "express"
import { validateRequestBody } from "zod-express-middleware"
import {createAccountDTO} from './account.dto'

const createAccountHandler:RequestHandler = async (req,res, next)=>{
    res.json(123)
}

export const accountRouter = express.Router()

accountRouter.post('/accounts', validateRequestBody(createAccountDTO), createAccountHandler)