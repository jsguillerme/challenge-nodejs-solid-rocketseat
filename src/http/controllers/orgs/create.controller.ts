import { makeCreateOrgUseCase } from '@/use-cases/factories/make-create-org-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { hash } from 'bcryptjs'

export async function createOrganization(
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
    password: z.string().min(6).max(64),
    phone: z.string(),
  })

  // parse para validação body content
  const { address, email, name, password, phone } =
    createOrganizationBodySchema.parse(request.body)

  const passowordHash = await hash(password, 6)
  // validações de negócio e criação do banco de dados (separar depois em service/usecases)
  const createOrgUseCase = makeCreateOrgUseCase()

  const { organization } = await createOrgUseCase.execute({
    name,
    password: passowordHash,
    email,
    address,
    phone,
  })

  // retornar resposta
  return reply.status(201).send({
    ...organization,
    password: undefined,
  })
}
