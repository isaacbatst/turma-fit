export class User {
  private id: string;
  private name: string;
  private email: string;
  private emailVerifiedAt: Date;
  private image: string;
  private age: number
  private trainings: Training[]
  private sentAdviceRequests: AdviceRequest[]        
  private receivedAdviceRequests: AdviceRequest[]     
  private userTrainingPlannings: UserTrainingPlanning[]
}

export class Personal extends User {
  private advices: Advice[]
}

export class Student extends User {
  private measures: Measurement[]
  private pictures: Picture[]
  private advices : Advice[]
}

