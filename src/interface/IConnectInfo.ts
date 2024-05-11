export default interface IConnectInfo {
  endpoint: string
  statusCode: number | string
  authToken?: string
  errorCode?: number | string
  uid?: number
}
