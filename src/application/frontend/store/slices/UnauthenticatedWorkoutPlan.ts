import { Day } from "@domain/entities/WorkoutPlan/enums/Day"
import { Grip } from "@domain/entities/WorkoutPlan/enums/Grip"

export interface SelectedPlanType {
  id: string,
  defaultMinRestTime: number,
  defaultMaxRestTime: number
}
 
interface CreateWorkoutPlanFormExercise {
  id: string,
  movementId: string,
  equipmentId?: string,
  grip?: Grip
}

export interface CreateWorkoutPlanFormSet {
  id: string,
  times: number,
  repetitions: string,
  techniqueId?: string,
  minRestTime?: number,
  maxRestTime?: number,
  exercises: CreateWorkoutPlanFormExercise[]
}

export interface CreateWorkoutPlanFormWorkout {
  id: string,
  aerobicMinutes: number,
  day?: Day
  sets: CreateWorkoutPlanFormSet[],
}