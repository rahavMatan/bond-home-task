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

export class NoAccountException extends APIError {
    constructor(){
        super(404, 'no such account')
    }
}