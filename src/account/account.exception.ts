import { APIError } from "../common/APIError";

export class NoUserException extends APIError {
    constructor(){
        super(400, 'no such user')
    }
}

export class InsufficeintInitialBalance extends APIError {
    constructor(){
        super(400, 'initial balance too low')
    }
}