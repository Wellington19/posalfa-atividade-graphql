import { getPersonByName, getPersons, savePerson } from '../src/services/personServiceMemory'

describe('Person Service', () => {
  it('should return a list of persons', () => {
    const persons = getPersons()

    expect(persons).toHaveLength(2)
  })

  it('should search for a registered person by name', () => {
    const person = getPersonByName('Fulano')

    expect(person.person_id).toBe(1)
    expect(person.name).toBe('Fulano')
    expect(person.phone).toBe('(44) 99999-9999')
  })

  it('should register a person', () => {
    const person = savePerson({
      person: {
        name: 'Fulano X',
        phone: '(44) 66666-6666'
      },
      addresses: [
        {
          logradouro: 'Rua Dracena',
          cep: '09180-390',
          number: '95',
          complement: ''
        }
      ],
      city: {
        name: 'Santo André'
      },
      neighborhood: {
        name: 'Jardim Alvorada'
      },
      state: {
        uf: 'SP',
        name: 'São Paulo'
      }
    })

    expect(person.person_id).toBe(3)
    expect(person.name).toBe('Fulano X')
    expect(person.phone).toBe('(44) 66666-6666')
  })
})