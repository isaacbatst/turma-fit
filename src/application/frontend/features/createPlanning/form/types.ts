import { Equipment, ExerciseTechnique, Grip, Movement, WorkoutPlanType } from "@prisma/client";

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
  movement: Movement | null,
  grip: Grip | null,
  equipment: Equipment | null
}