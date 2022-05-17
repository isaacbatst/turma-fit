import { CookiesNames } from "@application/api/common/CookiesNames";
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
    const request = RequestMock.make({ cookies: { [CookiesNames.AUTHORIZATION]: 'any_token' } });

    const bodyValidator = new GetMyWorkoutPlansBodyValidator();

    expect(() => bodyValidator.validate(request)).toThrowError('EMPTY_USER_ID');
  })

  it('should throw an error if the userId is not a string', () => {
    const request = RequestMock.make({ cookies: { [CookiesNames.AUTHORIZATION]: 'any_token' }, query: { userId: 123 } });

    const bodyValidator = new GetMyWorkoutPlansBodyValidator();

    expect(() => bodyValidator.validate(request)).toThrowError('INVALID_USER_ID');
  })

  it('should return validated query and cookies if everything is ok', () => {
    const request = RequestMock.make({ cookies: { [CookiesNames.AUTHORIZATION]: 'any_token' }, query: { userId: 'any_user_id' } });

    const bodyValidator = new GetMyWorkoutPlansBodyValidator();

    const { query, cookies } = bodyValidator.validate(request)
    
    expect(query).toEqual(request.query);
    expect(cookies).toEqual(request.cookies);
  })
})