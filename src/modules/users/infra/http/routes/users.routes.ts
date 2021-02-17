import { Router } from 'express'
const usersRouter = Router()
import UsersController from '../controllers/UsersController'
import FindUserController from '../controllers/FindUserController'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const usersController = new UsersController()
const findUserController = new FindUserController()

usersRouter.use(ensureAuthenticated)

usersRouter.post('/', usersController.create)
usersRouter.post('/find', findUserController.index)

export default usersRouter
