import express, { RequestHandler } from "express";
import { validateRequestBody } from 'zod-express-middleware';
import {createUserDto} from './user.dto'
const createUser:RequestHandler = (req,res)=>{

}

const userRouter = express.Router()

userRouter.post('/users', validateRequestBody(createUserDto), createUser)

