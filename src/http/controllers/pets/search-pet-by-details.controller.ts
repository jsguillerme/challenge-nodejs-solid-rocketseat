import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeSearchPetByDetailsUseCase } from '@/use-cases/factories/make-search-pet-by-details-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function searchPetByDetails(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  // validação zod schema
  const searchPetByDetailsSchemaQuery = z.object({
    query: z.string().default(''),
  })

  // parse para validação body content
  const { query } = searchPetByDetailsSchemaQuery.parse(request.query)

  try {
    const searchPetByDetailsUseCase = makeSearchPetByDetailsUseCase()

    const { pets } = await searchPetByDetailsUseCase.execute({
      query,
    })

    // retornar resposta
    return reply.status(200).send({ pets })
  } catch (error) {
    if (error instanceof ResourceNotFoundError)
      return reply.status(400).send({ message: error.message })

    throw error
  }
}
