import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetAllPetsUseCase } from '@/use-cases/factories/make-get-all-pets-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getAllPets(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getAllPetsUseCase = makeGetAllPetsUseCase()

    const { pets } = await getAllPetsUseCase.execute()

    // retornar resposta
    return reply.status(200).send({ pets })
  } catch (error) {
    if (error instanceof ResourceNotFoundError)
      return reply.status(400).send({ message: error.message })

    throw error
  }
}
