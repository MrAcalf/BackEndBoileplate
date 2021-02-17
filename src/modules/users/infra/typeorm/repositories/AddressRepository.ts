import Address from '../entities/Adress'
import { getRepository, Repository } from 'typeorm'
import IAddressesRepository from '@modules/users/repositories/IAddressesRepository'
import ICreateAddressDTO from '@modules/users/dtos/ICreateAddressDTO'

class AddressRepository implements IAddressesRepository {
  private ormRepository: Repository<Address>
  constructor() {
    this.ormRepository = getRepository(Address)
  }

  public async create({
    zipCode,
    city,
    state,
    number,
    complement,
    userId,
    lat,
    long
  }: ICreateAddressDTO): Promise<Address | undefined> {
    const address = await this.ormRepository.create({
      zipCode,
      city,
      state,
      number,
      complement,
      userId,
      lat,
      long
    })

    await this.ormRepository.save(address)

    return address
  }

  public async findOne(userId: string): Promise<Address | undefined> {
    const address = this.ormRepository.findOne({
      where: { userId }
    })

    return address
  }
}

export default AddressRepository
