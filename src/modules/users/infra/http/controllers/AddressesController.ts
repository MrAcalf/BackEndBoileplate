import { Request, Response } from 'express'
import { container } from 'tsyringe'

import CreateAddressService from '@modules/users/services/CreateAddressService'

export default class AdressesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      userId,
      zipCode,
      state,
      city,
      street,
      number,
      complement,
      lat,
      long
    } = request.body

    const createAddress = container.resolve(CreateAddressService)

    const address = await createAddress.execute({
      userId,
      zipCode,
      state,
      city,
      street,
      number,
      complement,
      lat,
      long
    })

    return response.json(address)
  }
}
