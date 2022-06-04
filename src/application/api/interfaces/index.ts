export interface HttpRequest {
  body: Record<string, any>,
  headers: Record<string, any>,
  query: Record<string, any>,
  cookies: Record<string, any>
}

export interface HttpResponse<T = {}> {
  body?: T | { error: string },
  cookies?: Record<string, { value: string, daysToExpire?: number }>,
  statusCode: number
}

export interface RequestValidator<T> {
  validate(request: Record<string, any>): T
}
export interface Controller<Response> {
  handle(request: HttpRequest): Promise<HttpResponse<Response>>
}