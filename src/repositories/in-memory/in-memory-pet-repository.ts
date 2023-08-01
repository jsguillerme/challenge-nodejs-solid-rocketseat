import { PetRepository } from '@/interfaces/mongo-pet-repository'
import { PetType } from '@/models/Pet'
import { ObjectId } from 'mongodb'

export class InMemoryPetRepository implements PetRepository {
  public items: PetType[] = []

  async register(data: PetType) {
    const pet = {
      id: new ObjectId(),
      name: data.name,
      gender: data.gender,
      organization: data.organization,
      available: data.available,
      registered_at: new Date(),
      adopted_at: data.adopted_at ?? null,
      city_available: data.city_available,
      details: data.details ?? [],
    }

    this.items.push(pet)

    return pet
  }

  async searchByCity(query: string) {
    const pets = this.items.filter(
      (pet) => pet.city_available.includes(query) && pet.available,
    )

    return pets
  }

  async findById(id: ObjectId) {
    const pet = this.items.find((pet) => pet.id === id)

    if (!pet) return null

    return pet
  }

  async findByDetails(query: string) {
    const pets = this.items.filter(
      (pet) => pet.details.includes(query) && pet.available,
    )

    return pets
  }
}
