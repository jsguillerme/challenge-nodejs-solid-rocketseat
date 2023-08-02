import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeRegisterPetUseCase } from '@/use-cases/factories/make-register-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { ObjectId } from 'mongodb'
import { z } from 'zod'

export async function registerPet(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  // validação zod schema
  const registerPetSchemaBody = z.object({
    name: z.string().min(3).max(255),
    gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
    available: z.boolean().default(true),
    adopted_at: z.date().optional(),
    city_available: z.string().min(3).max(255),
    details: z.array(z.string()).optional(),
  })

  const organizationIdSchemaParams = z.object({
    organizationId: z.string().nonempty(),
  })

  // parse para validação body content
  const { available, city_available, gender, name, adopted_at, details } =
    registerPetSchemaBody.parse(request.body)

  const { organizationId } = organizationIdSchemaParams.parse(request.params)

  try {
    const registerPetUseCase = makeRegisterPetUseCase()

    const { pet } = await registerPetUseCase.execute({
      organizationId: new ObjectId(organizationId),
      available,
      city_available,
      gender,
      name,
      adopted_at: adopted_at ?? null,
      details: details ?? [],
    })

    // retornar resposta
    return reply.status(201).send({ message: 'Pet created successfully', pet })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError)
      return reply.status(400).send({ message: error.message })

    throw error
  }
}
