import { Router, Request, Response } from 'express'
import AuthenticateUserService from '../services/AuthenticateUserService'
const sessionsRouter = Router()

sessionsRouter.post('/', async (request: Request, response: Response) => {
  try {
    const { username, password } = request.body

    const authenticateUser = new AuthenticateUserService()

    const { user, token } = await authenticateUser.execute({
      username,
      password
    })

    // @ts-expect-error ignore because api doesn´t need return password on return
    delete user.password

    return response.json({ user, token })
  } catch (err) {
    return response.status(400).json({ error: err.message })
  }
})

export default sessionsRouter
