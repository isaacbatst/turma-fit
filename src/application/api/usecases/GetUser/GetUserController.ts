import { CookiesNames } from "@application/api/common/CookiesNames";
import { BodyValidator, Controller, HttpResponse } from "@application/api/interfaces";
import { AuthenticationError } from "@domain/errors/AuthenticationError";
import { IGetUserUseCase } from "@domain/usecases/GetUser/GetUserUseCase";

interface GetUserControllerResponse {
  user: {
    name: string
  }
}

interface GetUserControllerRequest {
  cookies: {
    [key: string]: any
  }
}

export interface GetUserValidRequest {
  cookies: {
    [CookiesNames.AUTHORIZATION]: string
  }
}

export class GetUserController implements Controller<GetUserControllerResponse> {
  constructor(
    private getUserUseCase: IGetUserUseCase,
    private getUserRequestValidator: BodyValidator<GetUserValidRequest>
  ) {}

  async handle(request: GetUserControllerRequest): Promise<HttpResponse<GetUserControllerResponse>> {
    try {
      const validatedRequest = this.getUserRequestValidator.validate(request);
    
      const { user } = await this.getUserUseCase.execute({
        token: validatedRequest.cookies[CookiesNames.AUTHORIZATION]
      });

      return {
        statusCode: 200,
        body: {
          user
        }
      }
    } catch(error) {
      if(error instanceof AuthenticationError) {
        return {
          statusCode: 401
        }
      }

      console.error(error);

      return {
        statusCode: 500
      }
    }
  }
}