import { RequestHandler } from 'express'
import { APIError } from '../common/APIError'


const fourOhFour: RequestHandler = (req, res, next) => {
    return next(new APIError(404,'resource not found'))
}

export default fourOhFour