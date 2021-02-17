import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn
} from 'typeorm'
import User from './User'

@Entity('addresses')
class Adresses {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  userId: string

  @OneToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User

  @Column()
  zipCode: string

  @Column()
  state: string

  @Column()
  city: string

  @Column()
  number: string

  @Column()
  complement: string

  @Column()
  lat: string

  @Column()
  long: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

export default Adresses
