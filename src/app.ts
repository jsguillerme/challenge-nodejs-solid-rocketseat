import fastify from 'fastify'
import { orgsRoutes } from './http/controllers/orgs/route'

export const app = fastify()

app.register(orgsRoutes, { prefix: '/orgs' })
