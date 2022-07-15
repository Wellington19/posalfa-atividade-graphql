import { ApolloServer } from 'apollo-server'
import { ICity } from 'interfaces/ICity'
import { INeighborhood } from 'interfaces/INeighborhood'
import { IAddress } from 'interfaces/IAddress'
import { IPerson } from 'interfaces/IPerson'
import { ISavePerson } from 'interfaces/ISavePerson'
import { getStateByUF, getStates } from './services/stateServiceMemory'
import { getCityByID, getCities } from './services/cityServiceMemory'
import { getNeighborhoodByID, getNeighborhoods } from './services/neighborhoodServiceMemory'
import { getAddresses, getAddressesByPersonID } from './services/addressServiceMemory'
import { getPersons, savePerson } from './services/personServiceMemory'

const typeDefs = `
  type Person {
    person_id: ID!
    name: String!
    phone: String!
    addresses: [Address]
  }

  type Address {
    address_id: ID!
    logradouro: String!
    number: String!
    cep: String!
    complement: String
    neighborhood: Neighborhood!
  }

  type Neighborhood {
    neighborhood_id: ID!
    name: String!
    city: City!
  }

  type City {
    city_id: ID!
    name: String!
    uf: String!
    state: State!
  }

  type State {
    uf: ID!
    name: String!
  }

  type Query {
    states: [State]
    cities: [City]
    neighborhoods: [Neighborhood]
    addresses: [Address]
    persons: [Person]
  }

  input PersonInput {
    name: String!
    phone: String!
  }

  input AddressInput {    
    logradouro: String!
    number: String!
    cep: String!
    complement: String
  }

  input NeighborhoodInput {    
    name: String!
  }

  input CityInput {
    name: String!
  }

  input StateInput {
    uf: ID!
    name: String!
  }

  type Mutation {
    savePerson (
      person: PersonInput!, addresses: [AddressInput]!, 
      neighborhood: NeighborhoodInput!, city: CityInput!, state: StateInput!
    ): Person
  }
`

const resolvers = {
	Query: {
    states () {
      return getStates()
    },
    cities () {
      return getCities()
    },
    neighborhoods () {
      return getNeighborhoods()
    },
    addresses () {
      return getAddresses()
    },
    persons () {
      return getPersons()
    }
  },
  City: {
		state(parent: ICity) {			
			return getStateByUF(parent.uf)
		}
  },
  Neighborhood: {
		city(parent: INeighborhood) {			
			return getCityByID(parent.city_id)
		}
  },
  Address: {
    neighborhood(parent: IAddress) {
      return getNeighborhoodByID(parent.neighborhood_id)
    }
  },
  Person: {
    addresses(parent: IPerson) {
      return getAddressesByPersonID(parent.person_id)
    }
  },
  Mutation: {
    async savePerson(parent, args: ISavePerson) {      
      return savePerson(args)
    }
  }
}

const server = new ApolloServer({
	typeDefs, 
	resolvers
})
server.listen(3000, () => {
  console.log('🚀 Servidor em execução...')
})