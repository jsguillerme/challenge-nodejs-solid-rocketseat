import { OrganizationRepository } from '@/interfaces/mongo-organization-repository'
import { OrganizationType } from '@/models/Organization'
import { ObjectId } from 'mongodb'

export class InMemoryOrganizationRepository implements OrganizationRepository {
  public items: OrganizationType[] = []

  async register(data: OrganizationType) {
    const organization = {
      id: new ObjectId(),
      name: data.name,
      address: data.address,
      email: data.email,
      password: data.password,
      phone: data.phone,
      created_at: new Date(),
      role: 'ADMIN',
    }

    this.items.push(organization)

    return organization
  }

  async findByEmail(email: string) {
    const organization = this.items.find((org) => org.email === email)

    if (!organization) return null

    return organization
  }

  async findById(id: ObjectId) {
    const organization = this.items.find((org) => org.id === id)

    if (!organization) return null

    return organization
  }
}
