import Address from '@modules/users/infra/typeorm/entities/Adress'
import ICreateAddressDTO from '@modules/users/dtos/ICreateAddressDTO'

export default interface IUsersRepository {
  create(data: ICreateAddressDTO): Promise<Address | undefined>
  findOne(userId: string): Promise<Address | undefined>
}
