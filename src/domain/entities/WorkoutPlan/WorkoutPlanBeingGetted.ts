import { WorkoutListBeingGetted, WorkoutWithoutLetter } from "./WorkoutListBeingGetted"

export interface WorkoutPlanType {
  id: string,
  name: string,
  defaultMinRestTime: number,
  defaultMaxRestTime: number
}

interface CreateWorkoutPlanEntityParams {
  id: string,
  workouts: WorkoutWithoutLetter[]
  planType: WorkoutPlanType
}

export default class WorkoutPlanBeingGetted {
  private id        : string                     
  private workoutList  : WorkoutListBeingGetted
  private planType  : WorkoutPlanType

  constructor(params: CreateWorkoutPlanEntityParams){
    this.id = params.id;
    this.planType = params.planType;
    this.workoutList = new WorkoutListBeingGetted(params.workouts);
  }

  getId() {
    return this.id;
  }

  getWorkouts() {
    return this.workoutList.getWorkouts();
  }

  getPlanType() {
    return this.planType;
  }
}

