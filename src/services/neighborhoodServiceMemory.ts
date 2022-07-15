import { INeighborhood } from 'interfaces/INeighborhood'

const neighborhoods: INeighborhood[] = [
  {
    neighborhood_id: 1,
    name: 'Jardim Santa Mônica I',
    city_id: 1
  },
  {
    neighborhood_id: 2,
    name: 'Jardim Tropical',
    city_id: 2
  },
  {
    neighborhood_id: 3,
    name: 'Jardim Mafra II',
    city_id: 1
  }
]

export function getNeighborhoodByID(neighborhood_id: number): INeighborhood {
  return neighborhoods.find(neighborhood => neighborhood.neighborhood_id === neighborhood_id)
}

export function getNeighborhoodExists(city_id: number, name: string): INeighborhood {
  return neighborhoods.find(neighborhood => (neighborhood.city_id === city_id && neighborhood.name === name))
}

export function getNeighborhoods(): INeighborhood[] {
  return neighborhoods
}

export function saveNeighborhood(city_id: number, name: string): INeighborhood {  
  const neighborhood = {
    neighborhood_id: neighborhoods.length + 1,
    name,
    city_id
  }
  neighborhoods.push(neighborhood)
  return neighborhood  
}