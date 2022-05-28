import { Day } from "@domain/entities/WorkoutPlan/enums/Day"
import { Grip } from "@domain/entities/WorkoutPlan/enums/Grip"

export type CreateWorkoutPlanPortExercise = {
  id           : string      
  movementId   : string  
  equipmentId  : string 
  grip?        : string
}

type CreateWorkoutPlanPortExerciseValidated = CreateWorkoutPlanPortExercise & {
  grip: Grip
}

export type CreateWorkoutPlanPortSet = {
  repetitions: string
  times: number
  techniqueId: string
  minRestTime?: number
  maxRestTime?: number
  exercises: CreateWorkoutPlanPortExercise[]
}

type CreateWorkoutPlanPortSetValidated = CreateWorkoutPlanPortSet & {
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
}

export interface CreateWorkoutPlanUseCasePortValidated {
  planTypeId: string
  userId: string,
  workouts: CreateWorkoutPlanPortWorkoutValidated[]
}

export interface CreateWorkoutPlanUseCaseDTO {
  id: string
}
