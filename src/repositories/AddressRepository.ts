import Addresses from '../models/Adress'
import { EntityRepository, Repository } from 'typeorm'

@EntityRepository(Addresses)
class UsersRepository extends Repository<Addresses> {}

export default UsersRepository
