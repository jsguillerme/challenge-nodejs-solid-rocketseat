import { MongoPetRepository } from '@/repositories/mongodb/mongo-pet-repository'
import { MongoOrgRepository } from '@/repositories/mongodb/mongo-org-repository'
import { RegisterPetUseCase } from '../register-pet-use-case'

export function makeRegisterPetUseCase() {
  const orgRepository = new MongoOrgRepository()
  const petRepository = new MongoPetRepository()
  const useCase = new RegisterPetUseCase(petRepository, orgRepository)

  return useCase
}
