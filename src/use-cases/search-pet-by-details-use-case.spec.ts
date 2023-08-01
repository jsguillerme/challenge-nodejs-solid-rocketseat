import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-org-repository'
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchPetByDetailsUseCase } from './search-pet-by-details-use-case'

let organizationRepository: InMemoryOrganizationRepository
let petRepository: InMemoryPetRepository
let sut: SearchPetByDetailsUseCase

describe('Search Pet By Details Use Case', () => {
  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationRepository()
    petRepository = new InMemoryPetRepository()
    sut = new SearchPetByDetailsUseCase(petRepository)
  })

  it('should be able to search a pet by details', async () => {
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

    await petRepository.register({
      organization: org.id,
      name: 'Pet 1',
      gender: 'MALE',
      available: true,
      adopted_at: null,
      city_available: 'Fortaleza',
      registered_at: new Date(),
      details: ['Vaccinated', 'Castrated'],
    })

    await petRepository.register({
      organization: org.id,
      name: 'Pet 2',
      gender: 'FEMALE',
      available: true,
      adopted_at: null,
      city_available: 'Fortaleza',
      registered_at: new Date(),
      details: ['Vaccinated', 'Castrated', 'Dewormed'],
    })

    const { pets } = await sut.execute({ query: 'Dewormed' })

    expect(pets).toHaveLength(1)
  })
})
