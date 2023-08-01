import mongoose, { InferSchemaType } from 'mongoose'
const Schema = mongoose.Schema

const OrganizationSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
})

export type OrganizationType = InferSchemaType<typeof OrganizationSchema>

export default mongoose.model('Organization', OrganizationSchema)
