import { OrganizationType } from '@/models/Organization'
import { OrganizationRepository } from '@/interfaces/mongo-organization-repository'
import { hash } from 'bcryptjs'

interface CreateOrganizationUseCaseRequest {
  name: string
  address: {
    city: string
    country: string
  }
  email: string
  password: string
  phone: string
  role: 'ADMIN' | 'OWNER' | 'MEMBER'
}

interface CreateOrganizationUseCaseResponse {
  organization: OrganizationType
}

export class CreateOrganizationUseCase {
  constructor(private organizationRepository: OrganizationRepository) {}

  async execute({
    address,
    email,
    name,
    password,
    phone,
    role,
  }: CreateOrganizationUseCaseRequest): Promise<CreateOrganizationUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const organizationAlreadyExists =
      await this.organizationRepository.findByEmail(email)

    if (organizationAlreadyExists)
      throw new Error('Organization already exists')

    const organization = await this.organizationRepository.register({
      address,
      email,
      name,
      password: password_hash,
      phone,
      created_at: new Date(),
      role,
    })

    return { organization }
  }
}
