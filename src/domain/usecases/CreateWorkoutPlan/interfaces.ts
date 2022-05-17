import { Day, Grip, Set, Workout } from "@domain/entities/WorkoutPlan/WorkoutPlan"

export type CreateWorkoutPlanPortExercise = {
  id           : string      
  movementId   : string  
  equipmentId  : string 
  grip?        : Grip
}

export type CreateWorkoutPlanPortSet = Set & {
  exercises: CreateWorkoutPlanPortExercise[]
}

export type CreateWorkoutPlanPortWorkout = Workout & {
  sets: CreateWorkoutPlanPortSet[]
}

export interface CreateWorkoutPlanUseCasePort {
  planTypeId: string
  userId: string
  workouts: (CreateWorkoutPlanPortWorkout & { day: string })[]
}

export interface CreateWorkoutPlanUseCasePortValidated {
  planTypeId: string
  userId: string,
  workouts: (Workout & { day: Day })[]
}

export interface CreateWorkoutPlanUseCaseDTO {
  id: string
}
