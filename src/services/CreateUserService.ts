import User from '../models/User'
import { getCustomRepository } from 'typeorm'
import UsersRepository from '../repositories/UsersRepository'

interface RequestDTO {
  name: string
  email: string
  password: string
}

class CreateUserService {
  public async execute({ name, email, password }: RequestDTO): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository)
    const findUser = await usersRepository.findByEmail(email)

    if (findUser) {
      throw Error('Email já cadastrado')
    }

    const user = usersRepository.create({ name, email, password })

    await usersRepository.save(user)

    return user
  }
}

export default CreateUserService
