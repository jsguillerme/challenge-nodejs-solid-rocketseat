import { MongoPetRepository } from '@/repositories/mongodb/mongo-pet-repository'
import { SearchPetByDetailsUseCase } from '../search-pet-by-details-use-case'

export function makeSearchPetByDetailsUseCase() {
  const petRepository = new MongoPetRepository()
  const useCase = new SearchPetByDetailsUseCase(petRepository)

  return useCase
}
