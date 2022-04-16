import { CreateUserUseCasePort, CreateUserUseCase } from "@domain/usecases/CreateUserUseCase/CreateUserUseCase";

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

export interface CreateUserResponse {
  id: string
}

export class CreateUserController {
  constructor(
    private bodyValidator: BodyValidator<CreateUserUseCasePort>,
    private createUserUseCase: CreateUserUseCase
  ){}

  async handle(req: HttpRequest): Promise<HttpResponse<CreateUserResponse>> {
    const { error, data } = this.bodyValidator.validate(req.body);

    if(error){
      return {
        statusCode: 400
      }
    }

    const created = await this.createUserUseCase.execute(data);
    
    return {
      statusCode: 201,
      body: {
        id: created.user.id
      }
    }
  }
}