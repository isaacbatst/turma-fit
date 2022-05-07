export class Session {
  private id: string
  private token: string

  constructor(id: string, token: string) {
    this.id = id;
    this.token = token
  }

  getId() {
    return this.id;
  }

  getToken() {
    return this.token;
  }
}