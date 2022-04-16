export interface HttpRequest {
  body: Record<string, any>,
}

export interface HttpResponse<T = {}> {
  body?: T,
  statusCode: number
}

export interface BodyValidatorReturn<T> {
  error: string | null,
  data: T
}

export interface BodyValidator<T> {
  validate(body: Record<string, any>): BodyValidatorReturn<T>
}
