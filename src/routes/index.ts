import { Router } from 'express'
import usersRouter from './users.routes'
import addressRouter from './addresses.routes'

const routes = Router()

routes.use('/users', usersRouter)
routes.use('/addresses', addressRouter)

export default routes
