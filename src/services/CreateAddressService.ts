import { getRepository } from 'typeorm'
import Address from '../models/Adress'

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
    const addressRepository = getRepository(Address)

    const checkExist = await addressRepository.findOne({
      where: { userId }
    })

    if (checkExist) {
      throw Error('Edite o endereço que já existe no cadastro')
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
