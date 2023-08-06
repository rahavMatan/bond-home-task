import { APIError } from "../common/APIError";

export class InsuficientFundsException extends APIError {
    constructor(){
        super(400, 'isufficnet funds to perform the transcation')
    }
}

export class DailyWithrawLimitExceeded extends APIError {
    constructor(){
        super(400, 'account has reached it daily withdraw limit')
    }
}

export class AccountBlockedException extends APIError {
    constructor(){
        super(400, 'account is blocked')
    }
}