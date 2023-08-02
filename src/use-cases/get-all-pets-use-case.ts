import { PetRepository } from '@/interfaces/mongo-pet-repository'
import { PetType } from '@/models/Pet'

interface GetAllPetsUseCaseResponse {
  pets: PetType[]
}

export class GetAllPetsUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute(): Promise<GetAllPetsUseCaseResponse> {
    const pets = await this.petRepository.findAll()

    return { pets }
  }
}
