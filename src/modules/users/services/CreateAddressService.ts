import Address from '../infra/typeorm/entities/Adress'
import AppError from '@shared/errors/AppError'
import ICreateAddressDTO from '@modules/users/dtos/ICreateAddressDTO'
import IAddressesRepository from '@modules/users/repositories/IAddressesRepository'
import { injectable, inject } from 'tsyringe'

@injectable()
class CreateUserService {
  constructor(
    @inject('AddressRepository')
    private addressRepository: IAddressesRepository
  ) {}
  public async execute({
    userId,
    zipCode,
    state,
    city,
    street,
    number,
    complement,
    lat,
    long
  }: ICreateAddressDTO): Promise<Address | undefined> {
    const checkExist = await this.addressRepository.findOne(userId)

    if (checkExist) {
      throw new AppError('Edite o endereço que já existe no cadastro')
    }

    const address = await this.addressRepository.create({
      userId,
      zipCode,
      state,
      city,
      street,
      number,
      complement,
      lat,
      long
    })

    return address
  }
}

export default CreateUserService
