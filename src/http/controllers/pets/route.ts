import { FastifyInstance } from 'fastify'
import { registerPet } from './register.controller'
import { searchPetByDetails } from './search-pet-by-details.controller'
import { searchPetByCity } from './search-pet-by-city.controller'
import { getAllPets } from './get-all-pets.controller'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/organization/:organizationId/register', registerPet)
  app.get('/search', searchPetByDetails)
  app.get('/search-by-city', searchPetByCity)
  app.get('/all', getAllPets)
}
