import User from '../models/User'
import { EntityRepository, Repository } from 'typeorm'

@EntityRepository(User)
class UsersRepository extends Repository<User> {
  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: { email }
    })

    return user || undefined
  }

  public async findByUserName(username: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: { username }
    })

    return user || undefined
  }
}

export default UsersRepository
