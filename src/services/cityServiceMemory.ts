import { ICity } from 'interfaces/ICity'

const cities: ICity[] = [
  {
    city_id: 1,
    name: 'Cianorte',
    uf: 'PR'
  },
  {
    city_id: 2,
    name: 'Maringá',
    uf: 'PR'
  },
  {
    city_id: 3,
    name: 'Umuarama',
    uf: 'PR'
  }
]

export function getCityByID(city_id: number): ICity {
  return cities.find(city => city.city_id === city_id)
}

export function getCityExists(name: string, uf: string): ICity {
  return cities.find(city => city.name === name && city.uf === uf)
}

export function getCities(): ICity[] {
  return cities
}

export function saveCity(name: string, uf: string): ICity {  
  const city = {
    city_id: cities.length + 1,
    name,
    uf
  }
  cities.push(city)
  return city    
}