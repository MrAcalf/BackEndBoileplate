import Address from '../models/Adress'
import { getCustomRepository } from 'typeorm'
import AddressRepository from '../repositories/AddressRepository'

interface RequestDTO {
  userId: string
  zipCode: string
  state: string
  city: string
  number: string
  complement: string
  lat: string
  long: string
}

class CreateUserService {
  public async execute({
    userId,
    zipCode,
    state,
    city,
    number,
    complement,
    lat,
    long
  }: RequestDTO): Promise<Address> {
    const addressRepository = getCustomRepository(AddressRepository)

    const checkExist = addressRepository.findOne({
      where: userId
    })

    if (checkExist) {
      throw Error(
        'Usuário já possui endereço cadastrado, vá para a tela de edição para alterar o endereço.'
      )
    }

    const address = addressRepository.create({
      userId,
      zipCode,
      state,
      city,
      number,
      complement,
      lat,
      long
    })

    await addressRepository.save(address)

    return address
  }
}

export default CreateUserService
