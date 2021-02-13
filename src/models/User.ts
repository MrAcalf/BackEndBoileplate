import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  password: string

  @Column('timestamp with time zone')
  createdAt: Date

  @Column('timestamp with time zone')
  updatedAt: Date
}

export default User
