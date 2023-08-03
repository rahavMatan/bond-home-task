import { APIError } from "../common/APIError";

export class UnderAgeException extends APIError {
    constructor(){
        super(403, 'User must be of legal age')
    }
}