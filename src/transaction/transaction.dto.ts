import z from 'zod'
import { TransactionType } from './transaction.entity'

export const createTransactionDTO = z.object({
    value:z.number(),
    type: z.nativeEnum(TransactionType)
})

export type CreateTransactionDTO = z.infer<typeof createTransactionDTO>