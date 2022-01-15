import { ExerciseTechnique, TrainingPlanningType } from "@prisma/client";
import { ExerciseWithMuscleGroups } from "../../../../types/schema";

export type CreateTrainingPlanningState = {
  type: TrainingPlanningType | null;
  trainings: TrainingBeingCreated[],
  apiData: {
    planningTypes: TrainingPlanningType[],
    exerciseTechniques: ExerciseTechnique[]
  }
}

export type ExerciseSerieBeingCreated = {
  exercises: ExerciseWithMuscleGroups[],
  times: number,
  repetitions: string,
  id: string,
  exerciseTechnique: ExerciseTechnique | null
}

export type TrainingBeingCreated = {
  letter: string,
  id: string,
  exercisesSeries: ExerciseSerieBeingCreated[]
}