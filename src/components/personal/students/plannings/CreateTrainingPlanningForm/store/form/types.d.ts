import { Exercise, TrainingPlanningType } from "@prisma/client";
import { Swiper } from 'swiper/types';
import { ADD_EXERCISES_SERIES, ADD_TRAINING, REMOVE_EXERCISES_SERIES, REMOVE_TRAINING, SET_PLANNING_TYPE } from "./actions";

export type CreatePlanningFormContextType = [
  CreateTrainingPlanningState, Dispatch<TrainingAction>
];

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
  type: TrainingPlanningType | null;
  trainings: TrainingBeingCreated[],
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
} |
{
  type: typeof SET_PLANNING_TYPE;
  payload: {
    type: TrainingPlanningType
  }
}


