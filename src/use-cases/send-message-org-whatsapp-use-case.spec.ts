import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-org-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SendMessageOrgWhatsappUseCase } from './send-message-org-whatsapp-use-case'

let organizationRepository: InMemoryOrganizationRepository
let sut: SendMessageOrgWhatsappUseCase

describe('Send Message Org Whatsapp Use Case', () => {
  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationRepository()
    sut = new SendMessageOrgWhatsappUseCase(organizationRepository)
  })

  it('should be able received a link to whatsapp with a contact org', async () => {
    const org = await organizationRepository.register({
      name: 'Organization Spec',
      email: 'orgspec@mail.com',
      password: 'orgspec123',
      phone: '85999999999',
      address: {
        city: 'Fortaleza',
        country: 'Brazil',
      },
      created_at: new Date(),
      role: 'ADMIN',
    })

    const { link_whatsapp } = await sut.execute({
      organization_id: org.id,
    })

    expect(link_whatsapp).toContain('https://wa.me/')
    expect(link_whatsapp).toContain(org.phone)
  })
})
