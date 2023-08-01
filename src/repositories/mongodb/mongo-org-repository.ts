import { OrganizationRepository } from '@/interfaces/mongo-organization-repository'
import Org, { OrganizationType } from '@/models/Organization'
import { ObjectId } from 'mongodb'

export class MongoOrgRepository implements OrganizationRepository {
  async register(data: OrganizationType): Promise<OrganizationType> {
    const organization = await Org.create(data)

    return organization
  }

  async findByEmail(email: string): Promise<OrganizationType | null> {
    const organization = await Org.findOne({ email })

    if (!organization) return null

    return organization
  }

  async findById(id: ObjectId): Promise<OrganizationType | null> {
    const organization = await Org.findById(id)

    if (!organization) return null

    return organization
  }
}
