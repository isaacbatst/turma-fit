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
