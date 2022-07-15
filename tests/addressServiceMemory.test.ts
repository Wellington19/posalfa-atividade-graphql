import { getAddress, getAddresses, getAddressesByPersonID, getAddressExists, saveAddress } from '../src/services/addressServiceMemory'

describe('Address Service', () => {
  it('should return a list of addresses', () => {
    const addresses = getAddresses()    
    expect(addresses).toHaveLength(2)
  })

  it('should return a list of addresses in the search by ID', () => {
    const [address] = getAddress(1)
    expect(address.logradouro).toBe('Rua Esmeralda')
    expect(address.number).toBe('115')
    expect(address.cep).toBe('87207-272')
    expect(address.complement).toBe('')
    expect(address.neighborhood_id).toBe(1)
  })

  it('should return a list of people addresses in the search by ID', () => {
    const [address, address2] = getAddressesByPersonID(1)
    expect(address.logradouro).toBe('Rua Esmeralda')
    expect(address.number).toBe('115')
    expect(address.cep).toBe('87207-272')
    expect(address.complement).toBe('')
    expect(address.neighborhood_id).toBe(1)

    expect(address2.logradouro).toBe('Rua Mazzaropi')
    expect(address2.number).toBe('100')
    expect(address2.cep).toBe('87207-374')
    expect(address2.complement).toBe('')
    expect(address2.neighborhood_id).toBe(3)
  })

  it('should register an address', () => {
    let address = getAddressExists('Rua Lamartine Babo', '100', 3)
    if (!address) {
      address = saveAddress('Rua Lamartine Babo', '100', '87207-380', '', 3, 1)
    }

    expect(address.logradouro).toBe('Rua Lamartine Babo')
    expect(address.number).toBe('100')
    expect(address.cep).toBe('87207-380')
    expect(address.complement).toBe('')
    expect(address.neighborhood_id).toBe(3) 
  })
})