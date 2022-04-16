import { CreateUserUseCasePort, CreateUserUseCase, CreateUserUseCaseDTO } from "@domain/usecases/CreateUserUseCase/CreateUserUseCase"
import { BodyValidator, BodyValidatorReturn } from "../user/CreateUserController"

export class BodyValidatorMock implements BodyValidator<CreateUserUseCasePort> {
  public error: string | null = null
  
  validate = jest.fn((req: Record<string, any>): BodyValidatorReturn<CreateUserUseCasePort> => {
    return {
      error: this.error,
      data: {
        age: 23,
        email: 'valid_email',
        image: 'valid_image',
        name: 'valid_name',
        password: 'valid_password',
        profile: 'PERSONAL'
      }
    }
  })
}

export class CreateUserServiceMock implements CreateUserUseCase {
  async execute(port: CreateUserUseCasePort): Promise<CreateUserUseCaseDTO> {
    return {
      profile: {
        id: 'any_id',
        type: port.profile
      },
      user: {
        id: 'any_id',
        email: port.email,
        name: port.name
      }
    }
  }
}