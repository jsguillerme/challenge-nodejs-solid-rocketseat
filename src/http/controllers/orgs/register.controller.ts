import { makeCreateOrgUseCase } from '@/use-cases/factories/make-create-org-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function registerOrganization(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  // validação zod schema
  const createOrganizationBodySchema = z.object({
    name: z.string().min(3).max(255),
    address: z.object({
      city: z.string().min(3).max(255),
      country: z.string().min(3).max(255),
    }),
    email: z.string().email().nonempty().toLowerCase().trim(),
    password: z.string().min(8).max(64),
    phone: z.string(),
    role: z.enum(['ADMIN', 'OWNER', 'MEMBER']),
  })

  // parse para validação body content
  const { address, email, name, password, phone, role } =
    createOrganizationBodySchema.parse(request.body)

  try {
    const createOrgUseCase = makeCreateOrgUseCase()

    await createOrgUseCase.execute({
      name,
      password,
      email,
      address,
      phone,
      role,
    })
  } catch (error) {
    return reply.status(400).send({ message: error.message })
  }

  // retornar resposta
  return reply
    .status(201)
    .send({ message: 'Organization created successfully' })
}
