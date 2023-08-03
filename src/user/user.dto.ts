import z from 'zod'

export const createUserDto = z.object({
    name: z.string(),
    birthDate: z.coerce.date()
})

export type CreateUserDTO = z.infer<typeof createUserDto>;