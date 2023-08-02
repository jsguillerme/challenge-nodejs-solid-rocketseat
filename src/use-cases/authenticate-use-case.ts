import { OrganizationType } from '@/models/Organization'
import { OrganizationRepository } from '@/interfaces/mongo-organization-repository'
import { compare } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface AuthenticateOrgUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateOrgUseCaseResponse {
  organization: OrganizationType
}

export class AuthenticateOrgUseCase {
  constructor(private organizationRepository: OrganizationRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateOrgUseCaseRequest): Promise<AuthenticateOrgUseCaseResponse> {
    const organization = await this.organizationRepository.findByEmail(email)

    if (!organization) throw new ResourceNotFoundError()

    const passwordMatch = await compare(password, organization.password)

    if (!passwordMatch) throw new InvalidCredentialsError()

    return {
      organization,
    }
  }
}
