import { Router } from 'express'
import usersRouter from './users.routes'
import addressRouter from './addresses.routes'
import sessionsRouter from './sessions.routes'

const routes = Router()

routes.use('/users', usersRouter)
routes.use('/addresses', addressRouter)
routes.use('/sessions', sessionsRouter)

export default routes
