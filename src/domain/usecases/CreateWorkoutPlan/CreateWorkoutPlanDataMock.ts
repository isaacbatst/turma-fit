import { Day } from "@domain/entities/WorkoutPlan/enums/Day"
import { WorkoutPlanBeingCreated } from "@domain/entities/WorkoutPlan/WorkoutPlanBeingCreated"
import WorkoutPlanBeingGetted from "@domain/entities/WorkoutPlan/WorkoutPlanBeingGetted"
import { UuidGeneratorMock } from "../_mocks"
import { CreateWorkoutPlanUseCasePort, CreateWorkoutPlanPortSet, CreateWorkoutPlanPortWorkout } from "./interfaces"

export class CreateWorkoutPlanDataMock {
  private static PORT_SET: CreateWorkoutPlanPortSet = {
    exercises: [],
    repetitions: '10',
    times: 3,
    techniqueId: 'any_technique_id'
  } 

  private static PORT_WORKOUT = {
    aerobicMinutes: 60,
    sets: [CreateWorkoutPlanDataMock.PORT_SET],
    day: Day.FRIDAY
  }

  static VALID_PORT: CreateWorkoutPlanUseCasePort = {
    planTypeId: 'any_plan_type_id',
    userId: 'any_user_id',
    workouts: [
      CreateWorkoutPlanDataMock.PORT_WORKOUT
    ]
  }

  static WORKOUT_PLAN: WorkoutPlanBeingCreated = new WorkoutPlanBeingCreated({
    planTypeId: 'any_plan_type_id',
    workouts: [
      CreateWorkoutPlanDataMock.PORT_WORKOUT
    ],
    uuidGenerator: new UuidGeneratorMock()
  })
}

