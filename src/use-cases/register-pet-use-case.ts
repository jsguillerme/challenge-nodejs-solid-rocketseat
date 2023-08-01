import { OrganizationRepository } from '@/interfaces/mongo-organization-repository'
import { PetRepository } from '@/interfaces/mongo-pet-repository'
import { PetType } from '@/models/Pet'
import { Types } from 'mongoose'

interface RegisterPetUseCaseRequest {
  name: string
  gender: string
  organizationId: Types.ObjectId
  available: boolean
  adopted_at: Date | null
  city_available: string
  details: string[]
}

interface RegisterPetUseCaseResponse {
  pet: PetType
}

export class RegisterPetUseCase {
  constructor(
    private petRepository: PetRepository,
    private organizationRepository: OrganizationRepository,
  ) {}

  async execute({
    adopted_at,
    available,
    gender,
    name,
    organizationId,
    city_available,
    details,
  }: RegisterPetUseCaseRequest): Promise<RegisterPetUseCaseResponse> {
    if (!organizationId) throw new Error('Organization need to be provided')

    const organization = await this.organizationRepository.findById(
      organizationId,
    )

    if (!organization) throw new Error('Organization not found')

    const pet = await this.petRepository.register({
      organization: organizationId,
      available,
      gender,
      name,
      registered_at: new Date(),
      adopted_at,
      city_available,
      details,
    })

    return { pet }
  }
}
