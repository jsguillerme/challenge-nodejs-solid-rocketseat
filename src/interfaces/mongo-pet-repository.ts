import { PetType } from '@/models/Pet'
import { ObjectId } from 'mongodb'

export interface PetRepository {
  register(data: PetType): Promise<PetType>
  searchByCity(data: string): Promise<PetType[]>
  findById(id: ObjectId): Promise<PetType | null>
  findByDetails(query: string): Promise<PetType[]>
  findAll(): Promise<PetType[]>
}
