import { Router } from 'express'
const usersRouter = Router()
import UsersController from '../controllers/UsersController'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const usersController = new UsersController()

usersRouter.use(ensureAuthenticated)

usersRouter.post('/', usersController.create)
usersRouter.get('/', usersController.show)

export default usersRouter
