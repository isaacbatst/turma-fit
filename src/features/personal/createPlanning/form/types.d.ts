import { ExerciseTechnique, TrainingPlanningType } from "@prisma/client";
import { ExerciseWithDetails, ExerciseWithMuscleGroups } from "../../../../types/schema";

export type CreateTrainingPlanningState = {
  type: TrainingPlanningType | null;
  trainings: TrainingBeingCreated[],
}

export type SetBeingCreated = {
  exercises: ExerciseBeingCreated[],
  times: number,
  repetitions: string,
  id: string,
  exerciseTechnique: ExerciseTechnique | null
}

export type TrainingBeingCreated = {
  letter: string,
  id: string,
  sets: SetBeingCreated[]
}

export type ExerciseBeingCreated = Omit<ExerciseWithDetails, 'id' | 'equipmentId' | 'movementId'>