import { Router, Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
const usersRouter = Router()

import CreateUserService from '../services/CreateUserService'
import UsersRepository from '../repositories/UsersRepository'
usersRouter.get('/', async (request: Request, response: Response) => {
  const usersRepository = getCustomRepository(UsersRepository)
  const users = await usersRepository.find()

  return response.json(users)
})

usersRouter.post('/', async (request: Request, response: Response) => {
  try {
    const { name, email, password } = request.body

    const createUser = new CreateUserService()

    const user = await createUser.execute({ name, email, password })

    return response.json(user)
  } catch (err) {
    return response.status(400).json({ error: err.message })
  }
})

export default usersRouter
