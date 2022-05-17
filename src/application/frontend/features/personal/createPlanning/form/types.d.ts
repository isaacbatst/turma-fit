import { Equipment, ExerciseTechnique, Grip, WorkoutPlanType } from "@prisma/client";
import { ExerciseWithDetails, ExerciseWithMuscleGroups, MovementWithMuscleGroup } from "../../../../../../../types/schema";

export type CreateTrainingPlanningState = {
  type: WorkoutPlanType | null;
  trainings: TrainingBeingCreated[],
}

export type TrainingBeingCreated = {
  letter: string,
  id: string,
  sets: SetBeingCreated[]
}

export type SetBeingCreated = {
  exercises: ExerciseBeingCreated[],
  times: number,
  repetitions: string,
  id: string,
  exerciseTechnique: ExerciseTechnique | null
}

export type ExerciseBeingCreated = {
  movement: MovementWithMuscleGroup | null,
  grip: Grip | null,
  equipment: Equipment | null
}