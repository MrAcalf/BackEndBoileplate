import { Router, Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
const addressRouter = Router()

import CreateAddressService from '../services/CreateAddressService'
import AddressRepository from '../repositories/AddressRepository'

addressRouter.get('/', async (request: Request, response: Response) => {
  const { userId } = request.body

  const addressRepository = getCustomRepository(AddressRepository)

  const address = await addressRepository.findOne({
    where: { userId }
  })

  return response.json(address)
})

addressRouter.post('/', async (request: Request, response: Response) => {
  try {
    const { userId, zipCode, state, city, number, complement, lat, long } = request.body

    const createAddress = new CreateAddressService()

    const user = await createAddress.execute({
      userId,
      zipCode,
      state,
      city,
      number,
      complement,
      lat,
      long
    })

    return response.json(user)
  } catch (err) {
    return response.status(400).json({ error: err.message })
  }
})

export default addressRouter
