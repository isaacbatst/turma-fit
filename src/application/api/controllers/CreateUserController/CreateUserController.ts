import { BodyValidator, Controller, HttpRequest, HttpResponse } from "@application/api/interfaces";
import { CreateUserUseCasePort, CreateUserUseCase } from "@domain/usecases/CreateUserUseCase/CreateUserUseCase";
import { ValidationError } from "./CreateUserBodyValidator";

export interface CreateUserResponse {
  id: string
}

export class CreateUserController implements Controller<CreateUserResponse> {
  constructor(
    private bodyValidator: BodyValidator<CreateUserUseCasePort>,
    private createUserUseCase: CreateUserUseCase
  ){}

  async handle(req: HttpRequest): Promise<HttpResponse<CreateUserResponse>> {
    try {
      const data = this.bodyValidator.validate(req.body);

      const created = await this.createUserUseCase.execute(data);
      
      return {
        statusCode: 201,
        body: {
          id: created.user.id
        }
      }
    } catch (error) {
      if(error instanceof ValidationError) {
        return {
          statusCode: 400,
          body: {
            error: error.message
          }
        }
      }

      console.error(error);

      return {
        statusCode: 500
      }
    }
  }
}