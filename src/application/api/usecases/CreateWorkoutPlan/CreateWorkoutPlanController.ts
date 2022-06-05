import { CookiesNames } from "@application/api/common/CookiesNames";
import { ValidationError } from "@application/api/errors/ValidationError";
import { Controller, HttpResponse } from "@application/api/interfaces";
import { AuthenticationError } from "@domain/errors/AuthenticationError";
import { AuthorizationError } from "@domain/errors/AuthorizationError";
import { CreateWorkoutPlanUseCase } from "@domain/usecases/CreateWorkoutPlan/CreateWorkoutPlanUseCase";
import { RelationError } from "@infra/persistence/errors/RelationError";
import { CreateWorkoutPlanRequest, ICreateWorkoutPlanRequestValidator } from "./CreateWorkoutPlanRequestValidator";
export interface CreateWorkoutPlanResponse {
  id: string
}

export interface ErrorLogger {
  log: (error: any) => void
}

export class CreateWorkoutPlanController implements Controller<CreateWorkoutPlanResponse> {
  constructor(
    private requestValidator: ICreateWorkoutPlanRequestValidator,
    private createWorkoutPlanService: CreateWorkoutPlanUseCase,
    private errorLogger: ErrorLogger
  ){}

  async handle(request: CreateWorkoutPlanRequest): Promise<HttpResponse<CreateWorkoutPlanResponse>> {
    try {
      const validatedRequest = this.requestValidator.validate(request);

      const { id } = await this.createWorkoutPlanService.execute({
        planTypeId: validatedRequest.body.workoutPlan.planTypeId,
        workouts: validatedRequest.body.workoutPlan.workouts,
        token: validatedRequest.cookies[CookiesNames.AUTHORIZATION],
        userId: validatedRequest.query.userId,
      });

      return {
        statusCode: 201,
        body: { id },
      }
    } catch (error) {
      if(error instanceof ValidationError){
        return {
          statusCode: 400,
          body: {
            error: error.getMessage(),
          }
        }
      }

      if(error instanceof AuthenticationError){
        return {
          statusCode: 401
        }
      }

      if(error instanceof AuthorizationError){
        return {
          statusCode: 403
        }
      }

      if(error instanceof RelationError){
        return {
          statusCode: 422
        }
      }

      if(error instanceof Error) {
        if(error.message === 'INVALID_DAY') {
          return {
            statusCode: 422
          }
        }
      }

      this.errorLogger.log(error)

      return {
        statusCode: 500
      }
    }
  }
}