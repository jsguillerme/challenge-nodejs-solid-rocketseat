import { MongoPetRepository } from '@/repositories/mongodb/mongo-pet-repository'
import { SearchPetCityUseCase } from '../search-pet-city-use-case'

export function makeSearchPetCityUseCase() {
  const petRepository = new MongoPetRepository()
  const useCase = new SearchPetCityUseCase(petRepository)

  return useCase
}
