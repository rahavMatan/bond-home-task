import express from 'express'
import {userRouter} from '../user/user.controller'
const root = express.Router()

root.use(userRouter)

export default root