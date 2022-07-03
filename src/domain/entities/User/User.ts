export interface CreateUserEntityParams {
  id: string;
  emailVerifiedAt?: Date | null;
  image?: string;
  name: string;
  email: string;
  birthdate: string;
  password: string
}
export class User {
  private id: string;
  private name: string;
  private email: string;
  private emailVerifiedAt: Date | null;
  private image: string | null;
  private birthdate: string;
  private password: string

  constructor(params: CreateUserEntityParams) {
    this.emailVerifiedAt = params.emailVerifiedAt || null;
    this.id = params.id;
    this.name = params.name;
    this.email = params.email;
    this.image = params.image || null;
    this.birthdate = params.birthdate;
    this.password = params.password
  }

  public getName(): string {
    return this.name;
  }

  public getId(): string {
    return this.id;
  }

  public getEmail(): string {
    return this.email;
  }

  public getPassword(): string {
    return this.password;
  }

  public getImage(): string | null {
    return this.image;
  }

  public getBirthdate(): string {
    return this.birthdate;
  }

  public getEmailVerifiedAt(): Date | null {
    return this.emailVerifiedAt;
  }
} 
