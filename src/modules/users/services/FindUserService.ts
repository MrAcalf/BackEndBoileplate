import AppError from '@shared/errors/AppError'
import User from '../infra/typeorm/entities/User'
import IFindUserDTO from '@modules/users/dtos/IFindUserDTO'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import { injectable, inject } from 'tsyringe'

@injectable()
class FindUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}
  public async execute({
    id
  }: IFindUserDTO): Promise<Omit<User, 'password'> | undefined> {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new AppError('Usuário não encontrado')
    }

    // @ts-expect-error ignore because api should not return the user password
    delete user.password

    return user
  }
}

export default FindUserService
