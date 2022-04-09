import { v4 } from "uuid";
import WorkoutPlan from "../WorkoutPlan/WorkoutPlan";

interface CreateUserEntityParams {
  id?: string;
  emailVerifiedAt?: Date;
  name: string;
  email: string;
  image: string;
  age: number
}
export class User {
  private id: string;
  private name: string;
  private email: string;
  private emailVerifiedAt: Date | null;
  private image: string;
  private age: number
  // private workoutPlans: WorkoutPlan[]
  // private sentAdviceRequests: AdviceRequest[]        
  // private receivedAdviceRequests: AdviceRequest[]     
  // private userTrainingPlannings: UserTrainingPlanning[]

  constructor(params: CreateUserEntityParams) {
    this.id = params.id || v4();
    this.emailVerifiedAt = params.emailVerifiedAt || null;
    this.name = params.name;
    this.email = params.email;
    this.image = params.image;
    this.age = params.age;
  }
} 

// export class Personal extends User {
//   private advices: Advice[]
// }

// export class Student extends User {
//   private measures: Measurement[]
//   private pictures: Picture[]
//   private advices : Advice[]
// }

