import { hash } from 'bcryptjs'
import AppError from '@shared/errors/AppError'
import User from '../infra/typeorm/entities/User'
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import { injectable, inject } from 'tsyringe'

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}
  public async execute({
    name,
    username,
    type,
    email,
    password
  }: ICreateUserDTO): Promise<Omit<User, 'password'> | undefined> {
    const findUserByEmail = await this.usersRepository.findByEmail(email)

    if (findUserByEmail) {
      throw new AppError('Email já cadastrado')
    }

    const findUserByUsername = await this.usersRepository.findByUserName(
      username
    )

    if (findUserByUsername) {
      throw new AppError('Nome de usuário já existente')
    }

    const hashedPassword = await hash(password, 8)

    const user = await this.usersRepository.create({
      name,
      username,
      type,
      email,
      password: hashedPassword
    })

    // @ts-expect-error ignore because api should not return the user password
    delete user.password

    return user
  }
}

export default CreateUserService
