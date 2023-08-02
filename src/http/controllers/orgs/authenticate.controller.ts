import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateSchemaBody = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  })

  const { email, password } = authenticateSchemaBody.parse(request.body)

  try {
    const authenticateUseCase = makeAuthenticateUseCase()

    const { organization } = await authenticateUseCase.execute({
      email,
      password,
    })
    const token = await reply.jwtSign(
      {
        role: organization.role,
      },
      {
        sign: {
          sub: organization.id?.toString(),
        },
      },
    )

    const refreshToken = await reply.jwtSign(
      {
        role: organization.role,
      },
      {
        sign: {
          sub: organization.id?.toString(),
          expiresIn: '7d',
        },
      },
    )

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: true,
      })
      .status(200)
      .send({ token })
  } catch (error) {
    if (error instanceof InvalidCredentialsError)
      return reply.status(400).send({ message: error.message })

    throw error
  }
}
