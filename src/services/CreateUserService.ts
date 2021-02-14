import { getCustomRepository } from 'typeorm'
import UsersRepository from '../repositories/UsersRepository'
import { hash } from 'bcryptjs'

import User from '../models/User'

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

    const hashedPassword = await hash(password, 8)

    const user = usersRepository.create({
      name,
      username,
      type,
      email,
      password: hashedPassword
    })

    await usersRepository.save(user)

    return user
  }
}

export default CreateUserService
