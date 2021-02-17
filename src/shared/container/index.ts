import { container } from 'tsyringe'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'
import IAddressesRepository from '@modules/users/repositories/IAddressesRepository'
import AddressRepository from '@modules/users/infra/typeorm/repositories/AddressRepository'

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
)

container.registerSingleton<IAddressesRepository>(
  'AddressRepository',
  AddressRepository
)
