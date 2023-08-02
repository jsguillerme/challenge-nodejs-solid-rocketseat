import { OrganizationRepository } from '@/interfaces/mongo-organization-repository'
import { ObjectId } from 'mongodb'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface SendMessageOrgWhatsappUseCaseRequest {
  organization_id: ObjectId
}

interface SendMessageOrgWhatsappUseCaseResponse {
  link_whatsapp: string
}

export class SendMessageOrgWhatsappUseCase {
  constructor(private organizationRepository: OrganizationRepository) {}

  async execute({
    organization_id,
  }: SendMessageOrgWhatsappUseCaseRequest): Promise<SendMessageOrgWhatsappUseCaseResponse> {
    const organization = await this.organizationRepository.findById(
      organization_id,
    )

    if (!organization) throw new ResourceNotFoundError()

    const message = `Olá, ${organization.name}!\nFiquei interessado em saber mais sobre um pet que vocês estão cuidando. Poderia me dar mais informações?`
    const linkWhatsapp = `https://wa.me/${
      organization.phone
    }?text=${decodeURIComponent(message)}`

    return { link_whatsapp: linkWhatsapp }
  }
}
