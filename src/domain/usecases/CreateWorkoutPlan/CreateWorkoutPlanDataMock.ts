import WorkoutPlan, { Day } from "@domain/entities/WorkoutPlan/WorkoutPlan"
import { CreateWorkoutPlanUseCasePort, SetNotValidated, WorkoutNotValidated } from "./interfaces"

export class CreateWorkoutPlanDataMock {
  private static PORT_SET: SetNotValidated = {
    id: 'any_set_id',
    exercises: [],
    repetitions: 10,
    times: 3,
  } 

  private static PORT_WORKOUT: WorkoutNotValidated = {
    id: 'any_workout_id',
    aerobicMinutes: 60,
    sets: [CreateWorkoutPlanDataMock.PORT_SET],
    day: Day.FRIDAY
  }

  static DEFAULT_PORT: CreateWorkoutPlanUseCasePort = {
    planTypeId: 'any_plan_type_id',
    userId: 'any_user_id',
    workouts: [
      CreateWorkoutPlanDataMock.PORT_WORKOUT
    ]
  }

  static WORKOUT_PLAN: WorkoutPlan = new WorkoutPlan({
    id: 'any_workout_plan_id',
    planTypeId: 'any_plan_type_id',
    workouts: [
      CreateWorkoutPlanDataMock.PORT_WORKOUT
    ]
  })
}

