import { ErrorRequestHandler } from 'express'
import config from '../config'
import { APIError } from '../common/APIError'

/**
 * 500 response & log when errors are raised.
 */
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    const {statusCode, message} = err instanceof APIError ? err : new APIError(500,'internal error')
    res.status(statusCode).json({message})
}

export default errorHandler