import { BodyValidator, HttpRequest, HttpResponse } from "@application/api/interfaces";
import { CreateUserUseCasePort, CreateUserUseCase } from "@domain/usecases/CreateUserUseCase/CreateUserUseCase";

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