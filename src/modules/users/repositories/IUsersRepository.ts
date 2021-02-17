import User from '@modules/users/infra/typeorm/entities/User'
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'

export default interface IUsersRepository {
  // find(): Promise<User[] | undefined>
  create(data: ICreateUserDTO): Promise<User | undefined>
  save(user: User): Promise<User>
  findById(id: string): Promise<User | undefined>
  findByEmail(email: string): Promise<User | undefined>
  findByUserName(username: string): Promise<User | undefined>
}
