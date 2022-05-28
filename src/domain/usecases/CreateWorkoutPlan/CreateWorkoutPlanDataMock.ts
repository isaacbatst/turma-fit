import { Day } from "@domain/entities/WorkoutPlan/WorkoutListBeingGetted"
import WorkoutPlanBeingGetted from "@domain/entities/WorkoutPlan/WorkoutPlanBeingGetted"
import { CreateWorkoutPlanUseCasePort, CreateWorkoutPlanPortSet, CreateWorkoutPlanPortWorkout } from "./interfaces"

export class CreateWorkoutPlanDataMock {
  private static PORT_SET: CreateWorkoutPlanPortSet = {
    id: 'any_set_id',
    exercises: [],
    repetitions: 10,
    times: 3,
  } 

  private static PORT_WORKOUT: CreateWorkoutPlanPortWorkout = {
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

  static WORKOUT_PLAN: WorkoutPlanBeingGetted = new WorkoutPlanBeingGetted({
    id: 'any_workout_plan_id',
    planType: {
      defaultMaxRestTime: 40,
      defaultMinRestTime: 30,
      id: 'any_plan_type_id',
      name: 'any_plan_type_name'
    },
    workouts: [
      CreateWorkoutPlanDataMock.PORT_WORKOUT
    ]
  })
}

