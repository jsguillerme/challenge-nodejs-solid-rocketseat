import mongoose, { InferSchemaType } from 'mongoose'
const Schema = mongoose.Schema

const PetSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
  },
  name: {
    type: String,
    required: true,
  },

  gender: {
    type: String,
    enum: ['MALE', 'FEMALE', 'OTHER'],
    required: true,
    default: 'OTHER',
  },

  organization: {
    type: Schema.Types.ObjectId,
    ref: 'Organization',
    required: true,
  },

  available: {
    type: Boolean,
    required: true,
  },

  registered_at: {
    type: Date,
    default: Date.now,
  },

  adopted_at: {
    type: Schema.Types.Mixed,
    default: null,
  },

  city_available: {
    type: String,
    required: true,
  },

  details: {
    type: Array,
    default: [],
  },
})

export type PetType = InferSchemaType<typeof PetSchema>

export default mongoose.model('Pet', PetSchema)
