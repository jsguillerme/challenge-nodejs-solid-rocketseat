import { MongoPetRepository } from '@/repositories/mongodb/mongo-pet-repository'
import { GetAllPetsUseCase } from '../get-all-pets-use-case'

export function makeGetAllPetsUseCase() {
  const petRepository = new MongoPetRepository()
  const useCase = new GetAllPetsUseCase(petRepository)

  return useCase
}
