export default interface ICreateUserDTO {
  name: string
  username: string
  type: 'admin' | 'customer'
  email: string
  password: string
}
