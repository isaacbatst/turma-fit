export interface HttpRequest {
  body: Record<string, any>,
}

export interface HttpResponse<T = {}> {
  body?: T | { error: string },
  statusCode: number
}

export interface BodyValidator<T> {
  validate(body: Record<string, any>): T
}
export interface Controller<ResponseType=any> {
  handle(request: HttpRequest): Promise<HttpResponse<ResponseType>>
}