import { CookiesNames } from "@application/api/common/CookiesNames";
import { ValidationError } from "@application/api/errors/ValidationError";
import { Controller, HttpRequest, HttpResponse } from "@application/api/interfaces";
import { AuthenticationError } from "@domain/errors/AuthenticationError";
import { AuthenticateUserUseCase } from "@domain/usecases/AuthenticateUserUseCase/AuthenticateUserUseCase";
import { IAuthenticateUserRequestValidator } from "./AuthenticateUserRequestValidator";

export interface AuthenticateUserResponse {
  accessToken: string
}

export class AuthenticateUserController implements Controller<AuthenticateUserResponse> {
  static DAYS_TO_EXPIRE_COOKIE = 15

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
        statusCode: 201,
        cookies: {
          [CookiesNames.AUTHORIZATION]: {
            value: accessToken,
            daysToExpire: AuthenticateUserController.DAYS_TO_EXPIRE_COOKIE
          }
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

      if(error instanceof AuthenticationError){
        return {
          statusCode: 401,
          body: {
            error: error.message
          }
        }
      }
      
      return {
        statusCode: 500
      }
    }
  }
}