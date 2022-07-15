import { getCityByID, getCities, getCityExists, saveCity } from '../src/services/cityServiceMemory'

describe('City Service', () => {
  it('should return a list of cities', () => {
    const cities = getCities()   

    expect(cities).toHaveLength(3)
  })

  it('should return a city in the search by ID', () => {
    const city = getCityByID(1)

    expect(city.uf).toBe('PR')
    expect(city.name).toBe('Cianorte')
  })

  it('should check if a city is already registered', () => {
    const city = getCityExists('Cianorte', 'PR')

    expect(city.city_id).toBe(1)
    expect(city.uf).toBe('PR')
    expect(city.name).toBe('Cianorte')
  })

  it('should register a city', () => {
    let city = getCityExists('São Paulo', 'SP')
    if (!city) {
      city = saveCity('São Paulo', 'SP')
    }
    
    expect(city.city_id).toBe(4)
    expect(city.uf).toBe('SP')
    expect(city.name).toBe('São Paulo')    
  })
})