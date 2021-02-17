import { Request, Response } from 'express'
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService'
import { container } from 'tsyringe'

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body

    const authenticateUser = container.resolve(AuthenticateUserService)

    const { user, token } = await authenticateUser.execute({
      username,
      password
    })

    // @ts-expect-error ignore because api doesn´t need return password on return
    delete user.password

    return response.json({ user, token })
  }
}
