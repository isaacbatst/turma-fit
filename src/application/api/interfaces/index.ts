export interface HttpRequest {
  body: Record<string, any>,
}

export interface HttpResponse<T = {}> {
  body?: T,
  statusCode: number
}

export interface BodyValidator<T> {
  validate(body: Record<string, any>): T
}
export interface Controller<T=any> {
  handle(request: HttpRequest): Promise<HttpResponse<T>>
}