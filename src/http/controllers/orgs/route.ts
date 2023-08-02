import { FastifyInstance } from 'fastify'
import { registerOrganization } from './register.controller'
import { authenticate } from './authenticate.controller'
import { refresh } from './refresh.controller'
import { sendMessageWhatsapp } from './send-message.controller'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/register', registerOrganization)
  app.post('/session', authenticate)

  app.get('/send-message-whatsapp/:organization_id', sendMessageWhatsapp)

  app.patch('/token/refresh', refresh)
}
