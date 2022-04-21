import { BodyValidator } from "@application/api/interfaces"
import { ProfileType } from "@domain/entities/User/Profile"
import { CreateUserUseCasePort } from "@domain/usecases/CreateUserUseCase/CreateUserPortValidator"
import { CreateUserUseCase, CreateUserUseCaseDTO } from "@domain/usecases/CreateUserUseCase/CreateUserUseCase"
import { ValidationError } from "../CreateUserBodyValidator"

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

export class CreateUserServiceMock implements CreateUserUseCase {
  async execute(port: CreateUserUseCasePort): Promise<CreateUserUseCaseDTO> {
    return {
      profile: {
        id: 'any_id',
        type: port.profile as ProfileType
      },
      user: {
        id: 'any_id',
        email: port.email,
        name: port.name
      }
    }
  }
}