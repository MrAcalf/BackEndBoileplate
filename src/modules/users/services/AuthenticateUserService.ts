import User from '../infra/typeorm/entities/User'
import { compare } from 'bcryptjs'
import authConfig from '@config/auth'
import { sign } from 'jsonwebtoken'
import AppError from '@shared/errors/AppError'
import IUsersRepository from '../repositories/IUsersRepository'
import { injectable, inject } from 'tsyringe'

interface RequestDTO {
  username: string
  password: string
}

interface Response {
  user: User
  token: string
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}
  public async execute({ username, password }: RequestDTO): Promise<Response> {
    const user = await this.usersRepository.findByUserName(username)

    if (!user) {
      throw new AppError('Combinção username/senha incorreta', 401)
    }

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw new AppError('Combinção username/senha incorreta', 401)
    }

    const { secret, expiresIn } = authConfig.jwt

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn
    })

    return { user, token }
  }
}

export default AuthenticateUserService
