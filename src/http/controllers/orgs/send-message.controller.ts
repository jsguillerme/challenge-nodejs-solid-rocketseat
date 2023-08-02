import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeSendMessageOrgWhatsappUseCase } from '@/use-cases/factories/make-send-message-org-whatsapp-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { ObjectId } from 'mongodb'
import { z } from 'zod'

export async function sendMessageWhatsapp(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  // validação zod schema
  const sendMessageWhatsappSchemaParams = z.object({
    organization_id: z.string().nonempty(),
  })

  // parse para validação body content
  const { organization_id } = sendMessageWhatsappSchemaParams.parse(
    request.params,
  )

  try {
    const sendMessageWhatsappUseCase = makeSendMessageOrgWhatsappUseCase()

    const { link_whatsapp } = await sendMessageWhatsappUseCase.execute({
      organization_id: new ObjectId(organization_id),
    })

    // retornar resposta
    return reply.status(200).send({ link_whatsapp })
  } catch (error) {
    if (error instanceof ResourceNotFoundError)
      return reply.status(400).send({ message: error.message })

    throw error
  }
}
