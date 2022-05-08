import { Day, Set, Workout } from "@domain/entities/WorkoutPlan/WorkoutPlan"
import { Grip } from "@prisma/client"

export type ExerciseNotValidated = {
  id           : string      
  movementId   : string  
  equipmentId  : string 
  grip?        : Grip
}

export type SetNotValidated = Set & {
  exercises: ExerciseNotValidated[]
}

export type WorkoutNotValidated = Workout & {
  sets: SetNotValidated[]
}

export interface CreateWorkoutPlanUseCasePort {
  planTypeId: string
  userId: string
  workouts: (WorkoutNotValidated & { day: string })[]
}

export interface CreateWorkoutPlanUseCasePortValidated {
  planTypeId: string
  userId: string,
  workouts: (Workout & { day: Day })[]
}

export interface CreateWorkoutPlanUseCaseDTO {
  id: string
}
