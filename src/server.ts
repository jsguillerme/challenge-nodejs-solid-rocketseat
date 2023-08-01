import { app } from '@/app'
import { env } from './env'
import { DatabaseMongo } from '@/database/mongodb'

async function bootstrap() {
  // init database
  DatabaseMongo.connect()
  app
    .listen({
      port: env.PORT,
      host: '0.0.0.0',
    })
    .then(() => {
      console.log(`🚀 Server listening on port ${env.PORT}`)
    })
}

bootstrap()
