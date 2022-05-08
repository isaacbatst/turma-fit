import { Day, Exercise, Movement, Set, Workout } from "@domain/entities/WorkoutPlan/WorkoutPlan"

export type MovementNotValidated = Movement & {
  muscleGroup: string
}

export type ExerciseNotValidated = Exercise & {
  movement: MovementNotValidated,
  grip: string
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
