import { Workout, WorkoutListBeingGetted, WorkoutPort } from "./WorkoutListBeingGetted"

export interface WorkoutPlanType {
  id: string,
  name: string,
  defaultMinRestTime: number,
  defaultMaxRestTime: number
}

interface CreateWorkoutPlanEntityParams {
  id: string,
  workouts: WorkoutPort[]
  planType: WorkoutPlanType
}

export interface WorkoutPlan {
  id: string,
  workouts: Workout[],
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

  toPlainObject() {
    return {
      id: this.getId(),
      planType: this.getPlanType(),
      workouts: this.getWorkouts()
    }
  }
}

