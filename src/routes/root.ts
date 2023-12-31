import express from 'express'
import {userRouter} from '../user/user.controller'
import {accountRouter} from '../account/account.controller'

const root = express.Router()

root.use(userRouter)

export default root