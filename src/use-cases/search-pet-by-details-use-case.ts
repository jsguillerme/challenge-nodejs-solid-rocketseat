import { PetRepository } from '@/interfaces/mongo-pet-repository'
import { PetType } from '@/models/Pet'

interface SearchPetByDetailsUseCaseRequest {
  query: string
}

interface SearchPetByDetailsUseCaseResponse {
  pets: PetType[]
}

export class SearchPetByDetailsUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute({
    query,
  }: SearchPetByDetailsUseCaseRequest): Promise<SearchPetByDetailsUseCaseResponse> {
    const pets = await this.petRepository.findByDetails(query)

    return {
      pets,
    }
  }
}
