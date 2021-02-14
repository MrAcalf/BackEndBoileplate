import { Router, Request, Response } from 'express'
import { getRepository } from 'typeorm'
const usersRouter = Router()

import CreateUserService from '../services/CreateUserService'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import User from '../models/User'

usersRouter.use(ensureAuthenticated)

usersRouter.get('/', async (request: Request, response: Response) => {
  const usersRepository = getRepository(User)
  const foundUsers = await usersRepository.find()

  const users = foundUsers.map(({ password, ...user }) => user)

  return response.json(users)
})

usersRouter.post('/', async (request: Request, response: Response) => {
  try {
    const { name, username, type, email, password } = request.body

    const createUser = new CreateUserService()

    const user = await createUser.execute({
      name,
      username,
      type,
      email,
      password
    })

    // @ts-expect-error ignore because api doesn´t need return password on return
    delete user.password

    return response.json(user)
  } catch (err) {
    return response.status(400).json({ error: err.message })
  }
})

export default usersRouter
