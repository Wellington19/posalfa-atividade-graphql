import { IPerson } from 'interfaces/IPerson'
import { ISavePerson } from 'interfaces/ISavePerson'
import { getStateByUF, saveState } from './stateServiceMemory'
import { getCityExists, saveCity } from './cityServiceMemory'
import { getNeighborhoodExists, saveNeighborhood } from './neighborhoodServiceMemory'
import { saveAddress } from './addressServiceMemory'

const persons: IPerson[] = [
  {
    person_id: 1,
    name: 'Fulano',
    phone: '(44) 99999-9999'
  },
  {
    person_id: 2,
    name: 'Ciclano',
    phone: '(44) 88888-8888'
  }
]

export function getPersons(): IPerson[] {
  return persons
}

export function getPersonByName(name: string): IPerson {
  return persons.find(person => person.name === name)
}

export function savePerson(data: ISavePerson): IPerson {  
  const state = getStateByUF(data.state.uf)
  if (!state) {
    saveState(data.state)
  }

  let city = getCityExists(data.city.name, data.state.uf)
  if (!city) {
    city = saveCity(data.city.name, data.state.uf)
  }

  let neighborhood = getNeighborhoodExists(city.city_id, data.neighborhood.name)
  if (!neighborhood) {
    neighborhood = saveNeighborhood(city.city_id, data.neighborhood.name)
  }

  let person = getPersonByName(data.person.name) 
  if (!person) {    
    person = {
      person_id: persons.length + 1,
      name: data.person.name,
      phone: data.person.phone 
    }
    persons.push(person)
  }

  for (const item of data.addresses) {    
    saveAddress(item.logradouro, item.number, item.cep, item.complement, neighborhood.neighborhood_id, person.person_id)    
  }

  return person
}