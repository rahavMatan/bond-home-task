import z from 'zod'
import { TransactionType } from './transaction.entity'

export const createTransactionDTO = z.object({
    value:z.number().positive(),
    type: z.nativeEnum(TransactionType)
})

export type CreateTransactionDTO = z.infer<typeof createTransactionDTO>

export const getTransactionDTO = z.object({
    fromDate: z.string().datetime().optional(),
    toDate: z.string().datetime().optional(),
})

export type GetTransactionDTO = z.infer<typeof getTransactionDTO>
