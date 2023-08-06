import express, { NextFunction, RequestHandler , Request, Response} from "express";
import { validateRequestBody, validateRequestParams } from 'zod-express-middleware';
import {createUserDto, userIdDTO} from './user.dto'
import { createUser, userExists } from "./user.service";
import { accountRouter } from "../account/account.controller";
import { NoUserException } from "./user.exception";

const createUserHandler:RequestHandler = async (req,res, next)=>{
    const [user,error] = await createUser(req.body)
    if(error){
        return next(error)
    }
    return res.status(201).json({user})
}


const userExistsGuard:RequestHandler = async (req,res,next)=>{
    if(!await userExists(req.params.user_id)){
        return next(new NoUserException())
    }
    next()
}

export const userRouter = express.Router()

userRouter.post('/users', validateRequestBody(createUserDto), createUserHandler)

userRouter.use(
    '/users/:user_id', 
    validateRequestParams(userIdDTO), 
    userExistsGuard, 
    accountRouter
)


