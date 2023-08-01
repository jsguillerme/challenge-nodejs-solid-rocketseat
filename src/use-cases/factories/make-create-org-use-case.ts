import { MongoOrgRepository } from '@/repositories/mongodb/mongo-org-repository'
import { CreateOrganizationUseCase } from '../create-organization-use-case'

export function makeCreateOrgUseCase() {
  const orgRepository = new MongoOrgRepository()
  const useCase = new CreateOrganizationUseCase(orgRepository)

  return useCase
}
