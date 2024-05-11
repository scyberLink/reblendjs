import IDate from './IDate'
import IMongoObject from './IMongoObject'

interface ITimestamp extends IMongoObject {
  createdAt: IDate
  updatedAt: IDate
}

export default ITimestamp
