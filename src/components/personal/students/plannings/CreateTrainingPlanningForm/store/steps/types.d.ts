import { Exercise } from "@prisma/client";
import { Swiper } from 'swiper/types';
import { REMOVE_SWIPER, SET_SWIPER } from "./actions";

export type CreatePlanningStepsContextType = [
  CreatePlanningStepsState, Dispatch<CreatePlanningStepsAction>
];

export type CreatePlanningStepsState = {
  swiper: Swiper | null
}

export type CreatePlanningStepsAction = |
{
  type: typeof SET_SWIPER;
  payload: {
    swiper: Swiper
  }
} |
{
  type: typeof REMOVE_SWIPER;
}

