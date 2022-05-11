import { ValidationError } from "@application/api/errors/ValidationError";
import { BodyValidator, Controller, HttpRequest, HttpResponse } from "@application/api/interfaces";
import { CreateUserUseCase } from "@domain/usecases/CreateUserUseCase/CreateUserUseCase";
import { CreateUserValidBody } from "./CreateUserBodyValidator";

export interface CreateUserResponse {
  id: string,
  token: string
}

export class CreateUserController implements Controller<CreateUserResponse> {
  constructor(
    private bodyValidator: BodyValidator<CreateUserValidBody>,
    private createUserUseCase: CreateUserUseCase
  ){}

  async handle(req: HttpRequest): Promise<HttpResponse<CreateUserResponse>> {
    try {
      const data = this.bodyValidator.validate(req.body);
      
      const created = await this.createUserUseCase.execute(data);
      
      return {
        statusCode: 201,
        body: {
          id: created.user.id,
          token: created.token
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