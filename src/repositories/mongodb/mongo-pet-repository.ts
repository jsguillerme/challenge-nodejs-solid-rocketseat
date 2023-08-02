import { PetRepository } from '@/interfaces/mongo-pet-repository'
import Pet, { PetType } from '@/models/Pet'
import { ObjectId } from 'mongodb'

export class MongoPetRepository implements PetRepository {
  async register(data: PetType): Promise<PetType> {
    const pet = await Pet.create(data)

    return pet
  }

  async searchByCity(query: string): Promise<PetType[]> {
    const pets = await Pet.find({
      city_available: {
        $regex: query,
        $options: 'i',
      },
      available: true,
    })

    return pets
  }

  async findById(id: ObjectId): Promise<PetType | null> {
    const pet = await Pet.findById(id)

    return pet
  }

  async findByDetails(query: string): Promise<PetType[]> {
    if (query.trim() === '') {
      const pets = await Pet.find({
        available: true,
      })

      return pets
    }

    const pets = await Pet.find({
      details: { $regex: query, $options: 'i' },
      available: true,
    })

    return pets
  }
}
