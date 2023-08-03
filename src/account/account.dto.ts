import { z } from "zod";
import { AccountStatus } from "./account.entity";

export const createAccountDTO = z.object({
    user_id:z.string().uuid(),
    balance: z.number(),
    dailyWithrawLimit: z.number()
})

export const updateStatusDTO = z.object({
    status: z.nativeEnum(AccountStatus)
})

export type CreateAccountDTO = z.infer<typeof createAccountDTO>