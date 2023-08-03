import express, { RequestHandler } from "express";
import { validateRequestBody } from 'zod-express-middleware';
import {createUserDto} from './user.dto'
import { createUser } from "./user.service";

const createUserHandler:RequestHandler = async (req,res, next)=>{
    const [user,error] = await createUser(req.body)
    if(error){
        return next(error)
    }
    return res.json({user})
}

export const userRouter = express.Router()

userRouter.post('/users', validateRequestBody(createUserDto), createUserHandler)

