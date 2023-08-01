import { MongoOrgRepository } from '@/repositories/mongodb/mongo-org-repository'
import { AuthenticateOrgUseCase } from '../authenticate-use-case'

export function makeAuthenticateUseCase() {
  const orgRepository = new MongoOrgRepository()
  const useCase = new AuthenticateOrgUseCase(orgRepository)

  return useCase
}
