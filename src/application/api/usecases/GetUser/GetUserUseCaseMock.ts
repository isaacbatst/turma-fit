import { GetUserUseCaseDTO, GetUserUseCasePort, IGetUserUseCase } from "@domain/usecases/GetUser/GetUserUseCase";

export class GetUserUserCaseMock implements  IGetUserUseCase {
  user = {
    id: 'any_id',
    name: 'any_name',
  }

  execute: (port: GetUserUseCasePort) => Promise<GetUserUseCaseDTO> = jest.fn(async () => {
    return {
      user: this.user
    } 
  });
}