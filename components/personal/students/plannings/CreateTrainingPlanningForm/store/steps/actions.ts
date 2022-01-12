import { Swiper } from "swiper/types";
import { CreatePlanningStepsAction } from "./types";

export const SET_SWIPER = 'SET_SWIPER';
export const REMOVE_SWIPER = 'REMOVE_SWIPER';

export const setSwiperAction = (swiper: Swiper): CreatePlanningStepsAction => ({
  type: SET_SWIPER,
  payload: {
    swiper
  }
})

export const removeSwiper = (): CreatePlanningStepsAction => ({
  type: REMOVE_SWIPER
})