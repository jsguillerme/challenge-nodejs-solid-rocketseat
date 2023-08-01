import { env } from '@/env'
import 'dotenv/config'
import mongoose from 'mongoose'

export class DatabaseMongo {
  static connect() {
    mongoose
      .connect(env.DATABASE_URL)
      .then(() => {
        console.log('Connected to MongoDB')
      })
      .catch((error) => {
        console.error('Error connecting to MongoDB', error)
      })
  }
}
