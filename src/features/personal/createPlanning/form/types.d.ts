import { Exercise, ExerciseTechnique, TrainingPlanningType } from "@prisma/client";

export type CreateTrainingPlanningState = {
  type: TrainingPlanningType | null;
  trainings: TrainingBeingCreated[],
  apiData: {
    planningTypes: TrainingPlanningType[],
    exerciseTechniques: ExerciseTechnique[]
  }
}

export type ExerciseSerieBeingCreated = {
  exercises: Exercise[],
  times: number,
  repetitions: string,
  id: string
}

export type TrainingBeingCreated = {
  letter: string,
  id: string,
  exercisesSeries: ExerciseSerieBeingCreated[]
}