import { PetRepository } from '@/interfaces/mongo-pet-repository'
import { PetType } from '@/models/Pet'

interface SearchPetCityUseCaseRequest {
  query: string
}

interface SearchPetCityUseCaseResponse {
  pets: PetType[]
}

export class SearchPetCityUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute({
    query,
  }: SearchPetCityUseCaseRequest): Promise<SearchPetCityUseCaseResponse> {
    const pets = await this.petRepository.searchByCity(query)

    return {
      pets,
    }
  }
}
