import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-org-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { AuthenticateOrgUseCase } from './authenticate-use-case'

let organizationRepository: InMemoryOrganizationRepository
let sut: AuthenticateOrgUseCase

describe('Create Organization Use Case', () => {
  beforeEach(async () => {
    organizationRepository = new InMemoryOrganizationRepository()
    sut = new AuthenticateOrgUseCase(organizationRepository)
  })

  it('should be able to authenticate a organization', async () => {
    await organizationRepository.register({
      name: 'Organization 1',
      email: 'johndoe@mail.com',
      password: await hash('johndoe123', 6),
      phone: '85999999999',
      address: {
        city: 'Fortaleza',
        country: 'Brazil',
      },
      created_at: new Date(),
      role: 'ADMIN',
    })

    const { organization } = await sut.execute({
      email: 'johndoe@mail.com',
      password: 'johndoe123',
    })

    expect(organization.email).toEqual(expect.any(String))
    expect(organization.id).not.toBeNull()
  })

  it('should not be able to authenticate a organization with wrong email', async () => {
    await organizationRepository.register({
      name: 'Organization 1',
      email: 'johndoe@mail.com',
      password: await hash('johndoe123', 6),
      phone: '85999999999',
      address: {
        city: 'Fortaleza',
        country: 'Brazil',
      },
      created_at: new Date(),
      role: 'ADMIN',
    })

    await expect(() =>
      sut.execute({
        email: 'johnwrongemail@mail.com',
        password: 'johndoe123',
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should not be able to authenticate a organization with password wrong', async () => {
    await organizationRepository.register({
      name: 'Organization 1',
      email: 'johndoe@mail.com',
      password: await hash('johndoe123', 6),
      phone: '85999999999',
      address: {
        city: 'Fortaleza',
        country: 'Brazil',
      },
      created_at: new Date(),
      role: 'ADMIN',
    })

    await expect(() =>
      sut.execute({
        email: 'johndoe@mail.com',
        password: 'wrongpassword',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
