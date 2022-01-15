import { SwiperSlide } from "swiper/react";
import { useAppSelector } from "../../../../../store/hooks";
import { ExercisesSeriesSlideContextProvider } from "./ExercisesSeriesSlide/ExercisesSeriesSlideContext";
import { SwiperContextProvider } from "./contexts/SwiperContext";
import CreateTrainingSwiper from "./CreateTrainingSwiper/CreateTrainingSwiper";
import ExercisesSeriesSlide from "./ExercisesSeriesSlide/ExercisesSeriesSlide";
import PlanningTypesRadios from "./PlanningTypeRadios/PlanningTypesRadios";
import React from "react";
import { TrainingCheckoutContextProvider } from "./TrainingCheckout/TrainingCheckoutContext";
import TrainingCheckout from "./TrainingCheckout/TrainingCheckout";

const Steps: React.FC = () => {
  const trainings = useAppSelector(state => state.personal.createPlanning.form.trainings);

  return (
    <CreateTrainingSwiper>
      <SwiperSlide><PlanningTypesRadios /></SwiperSlide>
      {
        trainings.map((training, trainingIndex) => (
          <React.Fragment key={training.id}>
            {
              training.exercisesSeries.map((exercisesSeries, exercisesSeriesIndex) => (
                <SwiperSlide key={exercisesSeries.id}>
                  <ExercisesSeriesSlideContextProvider value={{
                    exercisesSeriesIndex,
                    training,
                    trainingIndex,
                    lastExerciseSeriesIndex: training.exercisesSeries.length - 1,
                    lastTrainingIndex: trainings.length - 1,
                  }}>
                    <ExercisesSeriesSlide />
                  </ExercisesSeriesSlideContextProvider>
                </SwiperSlide>
              ))
            }
            <SwiperSlide>
              <TrainingCheckoutContextProvider value={{ training }}>
                <TrainingCheckout />
              </TrainingCheckoutContextProvider>
            </SwiperSlide>
          </React.Fragment>
        ))
      }
    </CreateTrainingSwiper>
  )
} 

const CreatePlanningSteps: React.FC = () => (
  <SwiperContextProvider>
    <div>
      <Steps />
    </div>
  </SwiperContextProvider>
)

export default CreatePlanningSteps