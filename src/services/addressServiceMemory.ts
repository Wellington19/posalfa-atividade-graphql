import { IAddress } from 'interfaces/IAddress'
import { IPersonAddress } from 'interfaces/IPersonAddress'

const addresses: IAddress[] = [
  {
    address_id: 1,
    logradouro: 'Rua Esmeralda',
    number: '115',
    cep: '87207-272',
    complement: '',
    neighborhood_id: 1
  },
  {
    address_id: 2,
    logradouro: 'Rua Mazzaropi',
    number: '100',
    cep: '87207-374',
    complement: '',
    neighborhood_id: 3
  }
]

const personAddresses: IPersonAddress[] = [
  {
    person_id: 1,
    address_id: 1
  },
  {
    person_id: 1,
    address_id: 2
  },
  {
    person_id: 2,
    address_id: 1
  }
]

export function getAddress(address_id: number): IAddress[] {
  return addresses.filter(address => address.address_id === address_id)
}

export function getAddresses(): IAddress[] {
  return addresses
}

export function getAddressesByPersonID(person_id: number): IAddress[] {
  const personAddressesID = personAddresses
    .filter(personAddress => personAddress.person_id === person_id)
    .map(personAddress => personAddress.address_id)
  return addresses.filter(address => personAddressesID.includes(address.address_id))
}

export function getAddressExists(logradouro: string, number: string, neighborhood_id: number): IAddress {
  return addresses.find(address => 
    address.logradouro === logradouro && address.number === number && address.neighborhood_id === neighborhood_id
  )
}

export function saveAddress(logradouro: string, number: string, cep: string, complement: string, neighborhood_id: number, person_id: number): IAddress {  
  const id = addresses.length + 1
  const address = {
    address_id: id,
    logradouro,
    number,
    cep,
    complement,
    neighborhood_id
  }
    
  addresses.push(address)
  personAddresses.push({
    person_id,
    address_id: id
  })
  
  return address
}    