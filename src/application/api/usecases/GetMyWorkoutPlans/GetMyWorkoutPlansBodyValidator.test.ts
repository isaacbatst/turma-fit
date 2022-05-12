import { RequestMock } from "@application/api/mocks";
import { GetMyWorkoutPlansBodyValidator } from "./GetMyWorkoutPlansBodyValidator";

describe('GetMyWorkoutPlansBodyValidator', () => {
  it('should be defined', () => {
    expect(GetMyWorkoutPlansBodyValidator).toBeDefined();
  })

  it('should throw an error if authorization header is missing', async () => {
    const bodyValidator = new GetMyWorkoutPlansBodyValidator();
    const request = RequestMock.make();

    expect(() => bodyValidator.validate(request)).toThrowError('EMPTY_AUTHORIZATION');
  })

  it('should throw an error if the userId is not provided', () => {
    const request = RequestMock.make({ headers: { authorization: 'any_token' } });

    const bodyValidator = new GetMyWorkoutPlansBodyValidator();

    expect(() => bodyValidator.validate(request)).toThrowError('EMPTY_USER_ID');
  })

  it('should throw an error if the userId is not a string', () => {
    const request = RequestMock.make({ body: { id: 10 }, headers: { authorization: 'any_token' }});

    const bodyValidator = new GetMyWorkoutPlansBodyValidator();

    expect(() => bodyValidator.validate(request)).toThrowError('INVALID_USER_ID');
  })

  it('should return the userId if everything is ok', () => {
    const request = RequestMock.make({ body: { id: 'any_user_id' }, headers: { authorization: 'any_token' }});

    const bodyValidator = new GetMyWorkoutPlansBodyValidator();

    expect(bodyValidator.validate(request)).toEqual({ userId: 'any_user_id', sessionToken: 'any_token' });
  })
})