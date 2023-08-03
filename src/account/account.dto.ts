import { z } from "zod";

export const createAccountDTO = z.object({
    user_id:z.string().uuid(),
    balance: z.number(),
})

export type CreateAccountDTO = z.infer<typeof createAccountDTO>