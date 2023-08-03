import { APIError } from "./APIError";

export type Either<T,E = Error> = [T,null] | [null, E]
export type TaskEither<T,E= Error> = Promise<Either<T,E>>

export const isError = (either:Either<unknown>):boolean=>{
    return either[1] instanceof Error
}