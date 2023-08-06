import { APIError } from "../common/APIError";

export class UnderAgeException extends APIError {
    constructor(){
        super(403, 'User must be of legal age')
    }
}

export class NoUserException extends APIError {
    constructor(){
        super(404, 'no such user')
    }
}