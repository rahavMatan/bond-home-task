export class APIError extends Error {
    statusCode:number
    message: string

    constructor(statusCode, message){
        super(message)
        this.statusCode = statusCode
       
    }
}