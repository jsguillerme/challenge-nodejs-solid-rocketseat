import { OrganizationType } from '@/models/Organization'
import { ObjectId } from 'mongodb'

export interface OrganizationRepository {
  register(data: OrganizationType): Promise<OrganizationType>
  findByEmail(email: string): Promise<OrganizationType | null>
  findById(id: ObjectId): Promise<OrganizationType | null>
}
