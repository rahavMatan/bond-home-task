import z from 'zod'

export const createUserDto = z.object({
    name: z.string(),
    birthDate: z.string().datetime()
})

export const userIdDTO = z.object({
    user_id:z.string().uuid()
})

export type CreateUserDTO = z.infer<typeof createUserDto>;