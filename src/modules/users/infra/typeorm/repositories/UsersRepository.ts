import User from '../entities/User'
import { getRepository, Repository } from 'typeorm'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>
  constructor() {
    this.ormRepository = getRepository(User)
  }
  // public async find(): Promise<User[] | undefined> {
  //   const users = await this.ormRepository.find()

  //   return users
  // }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email }
    })

    return user
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id)

    return user
  }

  public async findByUserName(username: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { username }
    })

    return user
  }

  public async create({
    name,
    email,
    password,
    type,
    username
  }: ICreateUserDTO): Promise<User | undefined> {
    const user = this.ormRepository.create({
      name,
      email,
      password,
      type,
      username
    })

    await this.ormRepository.save(user)

    return user
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user)
  }
}

export default UsersRepository
