export class ValidationError extends Error {
  constructor(
    public message: string
  ){
    super(message);
  }

  getMessage(){
    return this.message;
  }
}

describe('CreateUserBodyValidator', () => {
  describe('Given it receives an invalid password', () => {
    it('should return INVALID_PASSWORD error', () => {

    })
  })
})