import { Exercise } from "@prisma/client";
import { ADD_EXERCISES_SERIES, ADD_TRAINING, REMOVE_EXERCISES_SERIES, REMOVE_TRAINING } from "./actions";

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

export type CreateTrainingPlanningState = {
  type: string;
  trainings: TrainingBeingCreated[]
}

export type TrainingAction = |
{
  type: typeof ADD_TRAINING;
} |
{
  type: typeof REMOVE_TRAINING;
  payload: {
    index: number;
  }
} |
{
  type: typeof ADD_EXERCISES_SERIES;
  payload: {
    trainingId: string
  }
} |
{
  type: typeof REMOVE_EXERCISES_SERIES;
  payload: {
    trainingId: string;
    index: number
  }
}

