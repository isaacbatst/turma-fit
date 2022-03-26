export interface CustomMockedResponse<ResponseBody> {
  json: ResponseBody,
  status: number
}

export  function createMockedResponse<T>(json: T, status: number = 200): CustomMockedResponse<T> {
  return {
    json,
    status
  }
}