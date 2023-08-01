import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-org-repository'
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterPetUseCase } from './register-pet-use-case'

let organizationRepository: InMemoryOrganizationRepository
let petRepository: InMemoryPetRepository
let sut: RegisterPetUseCase

describe('Register Pet Use Case', () => {
  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationRepository()
    petRepository = new InMemoryPetRepository()
    sut = new RegisterPetUseCase(petRepository, organizationRepository)
  })

  it('should be able to register a new pet', async () => {
    const org = await organizationRepository.create({
      name: 'Organization Spec',
      email: 'orgspec@mail.com',
      password: 'orgspec123',
      phone: '85999999999',
      address: {
        city: 'Fortaleza',
        country: 'Brazil',
      },
      created_at: new Date(),
    })

    const { pet } = await sut.execute({
      organizationId: org.id,
      name: 'Pet 1',
      gender: 'MALE',
      available: true,
      adopted_at: null,
      city_available: 'Fortaleza',
      details: ['Vaccinated', 'Castrated'],
    })

    expect(pet.organization).toEqual(org.id)
    expect(pet.name).toEqual('Pet 1')
  })
})
