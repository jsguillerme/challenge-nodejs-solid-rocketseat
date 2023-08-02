import { OrganizationRepository } from '@/interfaces/mongo-organization-repository'
import { PetRepository } from '@/interfaces/mongo-pet-repository'
import { PetType } from '@/models/Pet'
import { Types } from 'mongoose'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { InvalidParamsProvidedError } from './errors/invalid-params-provided-error'

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
    if (!organizationId) throw new InvalidParamsProvidedError()

    const organization = await this.organizationRepository.findById(
      organizationId,
    )

    if (!organization) throw new ResourceNotFoundError()

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
