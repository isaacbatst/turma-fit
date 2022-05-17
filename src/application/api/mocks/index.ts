import { BodyValidator, HttpRequest } from "@application/api/interfaces"
import { CreateUserUseCasePort } from "@domain/usecases/CreateUserUseCase/CreateUserPortValidator"
import { ValidationError } from "../errors/ValidationError"

export class BodyValidatorMock implements BodyValidator<CreateUserUseCasePort> {
  public error: string | null = null
  
  validate = jest.fn((req: Record<string, any>): CreateUserUseCasePort => {
    if(this.error){
      throw new ValidationError(this.error)
    }

    return {
      age: 23,
      email: 'valid_email',
      image: 'valid_image',
      name: 'valid_name',
      password: 'valid_password',
      profile: 'PERSONAL'
    }
  })
}

export class RequestMock {
  static make = ({ body, query, headers, cookies }: Partial<HttpRequest> | undefined = {}): HttpRequest => {
    return {
      body: body || {},
      query: query || {},
      headers: headers || {},
      cookies: cookies || {}
    }
  }
}