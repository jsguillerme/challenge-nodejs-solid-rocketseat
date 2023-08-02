import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeSearchPetCityUseCase } from '@/use-cases/factories/make-search-pet-city-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function searchPetByCity(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  // validação zod schema
  const searchPetByCitySchemaQuery = z.object({
    query: z
      .string()
      .toLowerCase()
      .transform((city) => {
        return decodeURIComponent(city)
      })
      .default(''),
  })

  // parse para validação body content
  const { query } = searchPetByCitySchemaQuery.parse(request.query)

  try {
    const searchPetByCityUseCase = makeSearchPetCityUseCase()

    const { pets } = await searchPetByCityUseCase.execute({
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
