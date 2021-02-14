import { getRepository } from 'typeorm'
import User from '../models/User'
import { compare } from 'bcryptjs'
import authConfig from '../config/auth'
import { sign } from 'jsonwebtoken'

interface RequestDTO {
  username: string
  password: string
}

interface Response {
  user: User
  token: string
}

class AuthenticateUserService {
  public async execute({ username, password }: RequestDTO): Promise<Response> {
    const usersRepository = getRepository(User)

    const user = await usersRepository.findOne({ where: { username } })

    if (!user) {
      throw new Error('Combinção username/senha incorreta')
    }

    const passwordMatched = compare(password, user.password)

    if (!passwordMatched) {
      throw new Error('Combinção username/senha incorreta')
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
