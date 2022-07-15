import { IState } from 'interfaces/IState'

const states: IState[] = [
  {
    uf: 'PR',
    name: 'Paraná'
  }
]

export function getStateByUF(uf: string): IState {
  return states.find(state => state.uf === uf)
}

export function getStates(): IState[] {
  return states
}

export function saveState(data: IState) {  
  states.push(data)  
}