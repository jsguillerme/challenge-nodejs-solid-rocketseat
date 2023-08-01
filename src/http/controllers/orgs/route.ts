import { FastifyInstance } from 'fastify'
import { createOrganization } from './create.controller'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/create', createOrganization)
}
