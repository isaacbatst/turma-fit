import { GetMyWorkoutPlansUseCasePort } from "./GetMyWorkoutPlansUseCase";

export class GetMyWorkoutPlansDataMock {
  static DEFAULT_PORT: GetMyWorkoutPlansUseCasePort = {
    userId: 'any_user_id',
    sessionToken: 'any_session_token'
  }
}
