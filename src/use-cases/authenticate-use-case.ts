import { OrganizationType } from '@/models/Organization'
import { OrganizationRepository } from '@/interfaces/mongo-organization-repository'
import { compare } from 'bcryptjs'

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

    if (!organization) throw new Error('Organization not found')

    const passwordMatch = await compare(password, organization.password)

    if (!passwordMatch) throw new Error('Incorrect password')

    return {
      organization,
    }
  }
}
