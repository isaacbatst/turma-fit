import { Day } from "@domain/entities/WorkoutPlan/enums/Day"
import { Grip } from "@domain/entities/WorkoutPlan/enums/Grip"
import { WorkoutPlanBeingCreated } from "@domain/entities/WorkoutPlan/WorkoutPlanBeingCreated"
import { UuidGeneratorMock } from "../_mocks"
import { CreateWorkoutPlanPortExercise, CreateWorkoutPlanPortSet, CreateWorkoutPlanPortWorkout, CreateWorkoutPlanPortWorkoutValidated, CreateWorkoutPlanUseCasePort } from "./interfaces"

export class CreateWorkoutPlanDataMock {
  public PORT_EXERCISE: CreateWorkoutPlanPortExercise = {
    equipmentId: 'any_equipment_id',
    movementId: 'any_movement_id',
  }

  private PORT_SET: CreateWorkoutPlanPortSet = {
    exercises: [this.PORT_EXERCISE],
    repetitions: '10',
    times: 3,
    techniqueId: 'any_technique_id'
  } 

  public PORT_WORKOUT: CreateWorkoutPlanPortWorkout = {
    aerobicMinutes: 60,
    sets: [this.PORT_SET],
    day: Day.FRIDAY
  }

  public PORT: CreateWorkoutPlanUseCasePort = {
    planTypeId: 'any_plan_type_id',
    userId: 'any_user_id',
    workouts: [
      this.PORT_WORKOUT
    ]
  }

  public WORKOUT_PLAN: WorkoutPlanBeingCreated = new WorkoutPlanBeingCreated({
    planTypeId: 'any_plan_type_id',
    workouts: [
      this.PORT_WORKOUT as CreateWorkoutPlanPortWorkoutValidated
    ],
    uuidGenerator: new UuidGeneratorMock()
  })
}

