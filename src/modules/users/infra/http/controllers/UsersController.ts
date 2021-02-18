import { Request, Response } from 'express'
import { container } from 'tsyringe'

import CreateUserService from '@modules/users/services/CreateUserService'
import FindUserService from '@modules/users/services/FindUserService'

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, username, type, email, password } = request.body
    const createUser = container.resolve(CreateUserService)

    const user = await createUser.execute({
      name,
      username,
      type,
      email,
      password
    })

    return response.json(user)
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.body
    const findUser = container.resolve(FindUserService)

    const user = await findUser.execute({ id })

    return response.json(user)
  }
}
