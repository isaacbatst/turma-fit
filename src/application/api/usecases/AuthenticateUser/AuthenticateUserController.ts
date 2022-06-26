import { ValidationError } from "@application/api/errors/ValidationError";
import { Controller, HttpRequest, HttpResponse } from "@application/api/interfaces";
import AuthenticateUserUseCase from "@domain/usecases/AuthenticateUserUseCase/AuthenticateUserUseCase";
import { IAuthenticateUserRequestValidator } from "./AuthenticateUserRequestValidator";

interface AuthenticateUserResponse {
  accessToken: string
}



export class AuthenticateUserController implements Controller<AuthenticateUserResponse> {
  constructor(
    private authenticateUserUseCase: AuthenticateUserUseCase,
    private requestValidator: IAuthenticateUserRequestValidator
  ){}

  async handle(request: HttpRequest): Promise<HttpResponse<AuthenticateUserResponse>> {
    try {
      const { email, password } = this.requestValidator.validate(request);

      const { accessToken } = await this.authenticateUserUseCase.execute({
        email,
        password
      });

      return {
        statusCode: 200,
        body: {
          accessToken
        }
      }
    } catch (error) {
      if(error instanceof ValidationError){
        return {
          statusCode: 400,
          body: {
            error: error.getMessage()
          }
        }
      }
      
      return {
        statusCode: 500
      }
    }
  }
}