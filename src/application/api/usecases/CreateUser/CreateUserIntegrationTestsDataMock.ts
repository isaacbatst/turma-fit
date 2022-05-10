import { CreateUserValidBody } from "./CreateUserBodyValidator";

export class CreateUserIntegrationTestsDataMock {
  INVALID_PASSWORD = 'INVALID';
  INVALID_PROFILE = 'INVALID';

  REQUEST_BODY: CreateUserValidBody = {
    name: 'any_name',
    email: 'any_valid@email.com',
    image: 'any_image',
    age: 30,
    profile: 'STUDENT',
    password: 'any_password',
  }

  REQUEST: any = {
    method: 'POST',
    body: this.REQUEST_BODY,
  }

  RESPONSE: any = {
    status: jest.fn(() => this.RESPONSE),
    json: jest.fn(() => this.RESPONSE),
    end: jest.fn(() => this.RESPONSE)
  }
}