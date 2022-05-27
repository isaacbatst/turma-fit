import { WorkoutList, WorkoutWithoutLetter } from "./WorkoutList"

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

export default class WorkoutPlan {
  private id        : string                     
  private workoutList  : WorkoutList
  private planType  : WorkoutPlanType

  constructor(params: CreateWorkoutPlanEntityParams){
    this.id = params.id;
    this.planType = params.planType;
    this.workoutList = new WorkoutList(params.workouts);
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

