import User from '../models/User'
import { getCustomRepository } from 'typeorm'
import UsersRepository from '../repositories/UsersRepository'

interface RequestDTO {
  name: string
  username: string
  type: 'admin' | 'customer'
  email: string
  password: string
}

class CreateUserService {
  public async execute({ name, username, type, email, password }: RequestDTO): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository)
    const findUserByEmail = await usersRepository.findByEmail(email)

    if (findUserByEmail) {
      throw Error('Email já cadastrado')
    }

    const findUserByUsername = await usersRepository.findByUserName(username)

    if (findUserByUsername) {
      throw Error('Nome de usuário já existente')
    }

    const user = usersRepository.create({
      name,
      username,
      type,
      email,
      password
    })

    await usersRepository.save(user)

    return user
  }
}

export default CreateUserService
