import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-org-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateOrganizationUseCase } from './create-organization-use-case'
import { compare } from 'bcryptjs'

let organizationRepository: InMemoryOrganizationRepository
let sut: CreateOrganizationUseCase

describe('Create Organization Use Case', () => {
  beforeEach(async () => {
    organizationRepository = new InMemoryOrganizationRepository()
    sut = new CreateOrganizationUseCase(organizationRepository)
  })

  it('should be able to create a new organization', async () => {
    const { organization } = await sut.execute({
      name: 'Organization 1',
      email: 'johndoe@mail.com',
      password: 'johndoe123',
      phone: '85999999999',
      address: {
        city: 'Fortaleza',
        country: 'Brazil',
      },
    })

    expect(organization.email).toEqual(expect.any(String))
  })

  it('should hash the password', async () => {
    const { organization } = await sut.execute({
      name: 'Organization 1',
      email: 'johndoe@mail.com',
      password: 'johndoe123',
      phone: '85999999999',
      address: {
        city: 'Fortaleza',
        country: 'Brazil',
      },
    })

    const passwordMatch = compare('johndoe123', organization.password)

    expect(passwordMatch).toBeTruthy()
  })

  it('should not allow to create an organization with an email already in use', async () => {
    await sut.execute({
      name: 'Organization 1',
      email: 'johndoe@mail.com',
      password: 'johndoe123',
      phone: '85999999999',
      address: {
        city: 'Fortaleza',
        country: 'Brazil',
      },
    })

    await expect(() =>
      sut.execute({
        name: 'Organization 1',
        email: 'johndoe@mail.com',
        password: 'johndoe123',
        phone: '85999999999',
        address: {
          city: 'Fortaleza',
          country: 'Brazil',
        },
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
