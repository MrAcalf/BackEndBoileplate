import { Router } from 'express'
const addressRouter = Router()
import AdressesController from '../controllers/AddressesController'

const adressesController = new AdressesController()

addressRouter.post('/', adressesController.create)

export default addressRouter
