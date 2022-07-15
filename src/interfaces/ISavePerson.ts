interface IStateInput {
  uf: string
  name: string
}

interface ICityInput {
  name: string
}

interface INeighborhoodInput {
  name: string
}

interface IAddressInput {
  logradouro: string
  number: string
  cep: string
  complement?: string
}

interface IPersonInput {
  name: string
  phone: string
}

export interface ISavePerson {
  person: IPersonInput 
  addresses: IAddressInput[]
  neighborhood: INeighborhoodInput
  city: ICityInput
  state: IStateInput
}