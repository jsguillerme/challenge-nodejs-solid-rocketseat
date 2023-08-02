import { MongoOrgRepository } from '@/repositories/mongodb/mongo-org-repository'
import { SendMessageOrgWhatsappUseCase } from '../send-message-org-whatsapp-use-case'

export function makeSendMessageOrgWhatsappUseCase() {
  const orgRepository = new MongoOrgRepository()
  const useCase = new SendMessageOrgWhatsappUseCase(orgRepository)

  return useCase
}
