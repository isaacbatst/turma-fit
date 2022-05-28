import { UuidGenerator } from "@domain/common/UuidGenerator";
import { WorkoutBeingCreated, WorkoutListBeingCreated } from "./WorkoutListBeingCreated";

interface WorkoutPlanBeingCreatedParams {
  planTypeId: string,
  workouts: WorkoutBeingCreated[],
  uuidGenerator: UuidGenerator
}

export class WorkoutPlanBeingCreated {
  private id: string;
  private workoutList: WorkoutListBeingCreated;
  private planTypeId: string;
  
  constructor(params: WorkoutPlanBeingCreatedParams){
    this.planTypeId = params.planTypeId,
    this.id = params.uuidGenerator.generate();

    this.workoutList = new WorkoutListBeingCreated({
      uuidGenerator: params.uuidGenerator,
      workouts: params.workouts
    });
  }

  public getId() {
    return this.id;
  }

  public getWorkouts() {
    return this.workoutList.getWorkouts();
  }

  public getPlanTypeId() {
    return this.planTypeId;
  }
}