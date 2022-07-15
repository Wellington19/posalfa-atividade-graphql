import { getStateByUF, getStates, saveState } from '../src/services/stateServiceMemory'

describe('State Service', () => {
  it('should return a list of states', () => {
    const states = getStates()  
      
    expect(states).toHaveLength(1)
  })

  it('should return a state in the search by UF', () => {
    const state = getStateByUF('PR')

    expect(state.uf).toBe('PR')
    expect(state.name).toBe('Paraná')
  })

  it('should register a state', () => {
    let state = getStateByUF('SP')
    if (!state) {
      saveState({
        uf: 'SP',
        name: 'São Paulo'
      })
      state = getStateByUF('SP')
    }
    
    expect(state.uf).toBe('SP')
    expect(state.name).toBe('São Paulo')
  })
})