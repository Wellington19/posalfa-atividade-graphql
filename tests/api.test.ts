import axios from 'axios'

describe('API Test', () => {
  it('should test a states query', async () => {
    const response = await axios({
			url: 'http://localhost:3000',
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			data: {
				query: `
					{
						states {
							uf
							name
						}
					}
				`
			}
		})
		const { data } = response.data
		const [state1] = data.states

		expect(state1.name).toBe('Paraná')
  })

  it('should test a cities query', async () => {
    const response = await axios({
			url: 'http://localhost:3000',
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			data: {
				query: `
					{
						cities {
							uf
							name
						}
					}
				`
			}
		})
		const { data } = response.data
		const [city1,city2,city3] = data.cities

		expect(city1.name).toBe('Cianorte')
    expect(city2.name).toBe('Maringá')
    expect(city3.name).toBe('Umuarama')
  })

  it('should test a neighborhoods query', async () => {
    const response = await axios({
			url: 'http://localhost:3000',
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			data: {
				query: `
					{
						neighborhoods {						
							name
						}
					}
				`
			}
		})
		const { data } = response.data
		const [neighborhood1,neighborhood2,neighborhood3] = data.neighborhoods

		expect(neighborhood1.name).toBe('Jardim Santa Mônica I')
    expect(neighborhood2.name).toBe('Jardim Tropical')
    expect(neighborhood3.name).toBe('Jardim Mafra II')
  })

  it('should test an addresses query', async () => {
    const response = await axios({
			url: 'http://localhost:3000',
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			data: {
				query: `
					{
						addresses {
              logradouro
              number
              cep
              complement
            }
					}
				`
			}
		})
		const { data } = response.data
		const [address1,address2] = data.addresses

		expect(address1.logradouro).toBe('Rua Esmeralda')
    expect(address2.logradouro).toBe('Rua Mazzaropi')
  })

  it('should test a persons query', async () => {
    const response = await axios({
			url: 'http://localhost:3000',
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			data: {
				query: `
					{
						persons {
              name
              phone
              addresses {
                logradouro
                number
                cep
                complement
                neighborhood {
                  name
                  city {
                    name
                    state {
                      uf
                      name
                    }
                  }
                }
              }
            }
					}
				`
			}
		})
		const { data } = response.data
		const [person1,person2] = data.persons

		expect(person1.name).toBe('Fulano')
    expect(person2.name).toBe('Ciclano')
  })

  it('should register a person', async () => {
    const response = await axios({
			url: 'http://localhost:3000',
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			data: {
				query: `
					mutation {
						savePerson (
              person: {
                name: "Beltrano"
                phone: "(44) 77777-7777"    
              }
              addresses: [
                {
                  logradouro: "Avenida Otacílio Negrão de Lima"
                  number: "13181"
                  cep: "31550-086"
                  complement: ""        
                }
              ]
              neighborhood: {
                name: "Jardim Atlântico"
              }
              city: {
                name: "Belo Horizonte"          
              }
              state: {
                uf: "MG"
                name: "Minas Gerais"
              }
            ){
              name
              phone
            }
					}
				`
			}
		})
		const { data } = response.data
		const person = data.savePerson

		expect(person.name).toBe('Beltrano')
  })
})