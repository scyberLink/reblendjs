/* eslint-disable @typescript-eslint/no-explicit-any */
import IConnectInfo from './IConnectInfo'
import IData from './IData'
/**
 * Response Structure Interface
 */
export default interface IResStruct {
  connection: IConnectInfo
  data: IData
}
