import z from 'zod'

export const createUserDto = z.object({
    name: z.string(),
    birthDate: z.string().datetime()
})

export type CreateUserDTO = z.infer<typeof createUserDto>;