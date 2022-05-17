import { v4 } from "uuid";

export enum PROFILE_TYPES {
  STUDENT = 'STUDENT',
  PERSONAL = 'PERSONAL'
}

export type ProfileType = keyof typeof PROFILE_TYPES

export abstract class Profile {
  protected id: string;
  protected abstract readonly type: ProfileType;
  // protected advices: Advice[]

  constructor(id?: string) {
    this.id = id || v4();
  }

  public getId(): string {
    return this.id;
  }

  public getType(): ProfileType {
    return this.type;
  } 
}

export class StudentProfile extends Profile {
  protected readonly type = PROFILE_TYPES.STUDENT
  //   private measures: Measurement[]
  //   private pictures: Picture[]
}
export class PersonalProfile extends Profile {
  protected readonly type = PROFILE_TYPES.PERSONAL
}

