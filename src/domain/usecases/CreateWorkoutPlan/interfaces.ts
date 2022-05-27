import { Grip, Set, WorkoutWithoutLetter } from "@domain/entities/WorkoutPlan/WorkoutList"

export type CreateWorkoutPlanPortExercise = {
  id           : string      
  movementId   : string  
  equipmentId  : string 
  grip?        : Grip
}

export type CreateWorkoutPlanPortSet = Set & {
  exercises: CreateWorkoutPlanPortExercise[]
}

export type CreateWorkoutPlanPortWorkout = WorkoutWithoutLetter & {
  sets: CreateWorkoutPlanPortSet[],
  day: string
}

export interface CreateWorkoutPlanUseCasePort {
  planTypeId: string
  userId: string
  workouts: CreateWorkoutPlanPortWorkout[]
}

export interface CreateWorkoutPlanUseCasePortValidated {
  planTypeId: string
  userId: string,
  workouts: WorkoutWithoutLetter[]
}

export interface CreateWorkoutPlanUseCaseDTO {
  id: string
}
