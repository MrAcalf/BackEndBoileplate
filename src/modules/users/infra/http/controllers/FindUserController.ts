import { Request, Response } from 'express'
import { container } from 'tsyringe'

import FindUserService from '@modules/users/services/FindUserService'

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.body
    const findUser = container.resolve(FindUserService)

    const user = await findUser.execute({ id })

    // @ts-expect-error ignore because api doesn´t need return password on return
    delete user.password

    return response.json(user)
  }
}
