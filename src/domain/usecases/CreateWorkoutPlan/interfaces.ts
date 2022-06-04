import { PortValidator } from "@domain/common/PortValidator"
import { Day } from "@domain/entities/WorkoutPlan/enums/Day"
import { Grip } from "@domain/entities/WorkoutPlan/enums/Grip"

export type CreateWorkoutPlanPortExercise = {
  movementId   : string  
  equipmentId?  : string 
  grip?        : string
}

export type CreateWorkoutPlanPortExerciseValidated = CreateWorkoutPlanPortExercise & {
  grip?: Grip
}

export type CreateWorkoutPlanPortSet = {
  repetitions: string
  times: number
  techniqueId: string
  minRestTime?: number
  maxRestTime?: number
  exercises: CreateWorkoutPlanPortExercise[]
}

export type CreateWorkoutPlanPortSetValidated = CreateWorkoutPlanPortSet & {
  exercises: CreateWorkoutPlanPortExerciseValidated[]
}

export type CreateWorkoutPlanPortWorkout = {
  sets: CreateWorkoutPlanPortSet[],
  day: string
  aerobicMinutes: number
}

export type CreateWorkoutPlanPortWorkoutValidated = CreateWorkoutPlanPortWorkout & {
  day: Day,
  sets: CreateWorkoutPlanPortSetValidated[]
}
export interface CreateWorkoutPlanUseCasePort {
  planTypeId: string
  userId: string
  workouts: CreateWorkoutPlanPortWorkout[]
  token: string
}

export interface CreateWorkoutPlanUseCasePortValidated {
  planTypeId: string
  userId: string,
  workouts: CreateWorkoutPlanPortWorkoutValidated[]
  token: string,
}

export interface CreateWorkoutPlanUseCaseDTO {
  id: string
}

export interface ICreateWorkoutPlanPortValidator extends PortValidator<CreateWorkoutPlanUseCasePort, CreateWorkoutPlanUseCasePortValidated> {} 
