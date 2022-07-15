import { getNeighborhoodByID, getNeighborhoodExists, getNeighborhoods, saveNeighborhood } from '../src/services/neighborhoodServiceMemory'

describe('Neighborhood Service', () => {
  it('should return a list of neighborhoods', () => {
    const neighborhoods = getNeighborhoods()    

    expect(neighborhoods).toHaveLength(3)
  })

  it('should return a neighborhood in the search by ID', () => {
    const neighborhood = getNeighborhoodByID(1)  

    expect(neighborhood.name).toBe('Jardim Santa Mônica I')
    expect(neighborhood.city_id).toBe(1)
  })

  it('should check if a neighborhood is already registered', () => {
    const neighborhood = getNeighborhoodExists(1, 'Jardim Santa Mônica I')

    expect(neighborhood.neighborhood_id).toBe(1)
    expect(neighborhood.city_id).toBe(1)
    expect(neighborhood.name).toBe('Jardim Santa Mônica I')
  })

  it('should register a neighborhood', () => {
    let neighborhood = getNeighborhoodExists(1, 'Jardim Universidade')
    if (!neighborhood) {
      neighborhood = saveNeighborhood(1, 'Jardim Universidade')    
    }

    expect(neighborhood.neighborhood_id).toBe(4)
    expect(neighborhood.city_id).toBe(1)    
    expect(neighborhood.name).toBe('Jardim Universidade')    
  })
})