import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-org-repository'
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchPetCityUseCase } from './search-pet-city-use-case'

let organizationRepository: InMemoryOrganizationRepository
let petRepository: InMemoryPetRepository
let sut: SearchPetCityUseCase

describe('Search Pet By City Use Case', () => {
  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationRepository()
    petRepository = new InMemoryPetRepository()
    sut = new SearchPetCityUseCase(petRepository)
  })

  it('should be able to search a pet by city and available', async () => {
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
      city_available: 'Maracanaú',
      registered_at: new Date(),
      details: ['Vaccinated', 'Castrated'],
    })

    const { pets } = await sut.execute({ query: 'Fortaleza' })

    expect(pets).toHaveLength(1)
    expect(pets[0].city_available).toEqual('Fortaleza')
  })
})
