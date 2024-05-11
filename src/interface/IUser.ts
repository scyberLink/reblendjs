import ITimestamp from './ITimestamp'

interface IUser extends ITimestamp {
  firstname: string
  lastname: string
  email: string
  password: string
  status: number
  role: number
  refID: number
  pin: string

  oauth: boolean
}

export default IUser
