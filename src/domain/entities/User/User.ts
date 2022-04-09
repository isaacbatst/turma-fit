import { v4 } from "uuid";

interface CreateUserEntityParams {
  id?: string;
  emailVerifiedAt?: Date;
  name: string;
  email: string;
  image: string;
  age: number;
}
export class User {
  private id: string;
  private name: string;
  private email: string;
  private emailVerifiedAt: Date | null;
  private image: string;
  private age: number

  constructor(params: CreateUserEntityParams) {
    this.id = params.id || v4();
    this.emailVerifiedAt = params.emailVerifiedAt || null;
    this.name = params.name;
    this.email = params.email;
    this.image = params.image;
    this.age = params.age;
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
} 
