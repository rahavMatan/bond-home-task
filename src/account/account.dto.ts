import { z } from "zod";
import { AccountStatus } from "./account.entity";

export const createAccountDTO = z.object({
    balance: z.number().positive(),
    dailyWithrawLimit: z.number()
})

export const updateStatusDTO = z.object({
    status: z.nativeEnum(AccountStatus)
})

export type CreateAccountDTO = z.infer<typeof createAccountDTO>