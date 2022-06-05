import { CookiesNames } from "@application/api/common/CookiesNames";
import { CreateWorkoutPlanRequest } from "./CreateWorkoutPlanRequestValidator";

export class CreateWorkoutPlanRequestMock {
  public EXERCISE: Record<string, any> = {
    movementId: 'any_movement_id',
    equipmentId: 'any_equipment_id',
    grip: 'any_grip'
  }

  public SET: Record<string, any> =  {
    exercises: [this.EXERCISE],
    repetitions: '10',
    times: 3,
    techniqueId: 'any_technique_id',
    maxRestTime: 10,
    minRestTime: 5
  }

  public WORKOUT: Record<string, any> = {
    aerobicMinutes: 10,
    day: 'any_day',
    sets: [
      this.SET
    ]
  }

  public WORKOUT_PLAN: Record<string, any> = {
    planTypeId: 'any_plan_type_id',
    workouts: [
      this.WORKOUT
    ]
  }

  public REQUEST: CreateWorkoutPlanRequest = {
    body: {
      workoutPlan: this.WORKOUT_PLAN
    },
    cookies: {
      [CookiesNames.AUTHORIZATION]: 'any_token'
    },
    query: {
      userId: 'any_user_id'
    },
  }
}