import { Router, Request, Response } from 'express'
import { getRepository } from 'typeorm'
const addressRouter = Router()

import CreateAddressService from '../services/CreateAddressService'
import Adress from '../models/Adress'

addressRouter.get('/', async (request: Request, response: Response) => {
  const { userId } = request.body

  const addressRepository = getRepository(Adress)

  const address = await addressRepository.findOne({
    where: { userId }
  })

  return response.json(address)
})

addressRouter.post('/', async (request: Request, response: Response) => {
  try {
    const { userId, zipCode, state, city, number, complement, lat, long } = request.body

    const createAddress = new CreateAddressService()

    const address = await createAddress.execute({
      userId,
      zipCode,
      state,
      city,
      number,
      complement,
      lat,
      long
    })

    return response.json(address)
  } catch (err) {
    return response.status(400).json({ error: err.message })
  }
})

export default addressRouter
