import { SwiperSlide } from "swiper/react";
import { useAppSelector } from "../../../../../store/hooks";
import { SetSlideContextProvider } from "./SetSlide/SetSlideContext";
import { SwiperContextProvider } from "./contexts/SwiperContext";
import CreateTrainingSwiper from "./CreateTrainingSwiper/CreateTrainingSwiper";
import SetSlide from "./SetSlide/SetSlide";
import PlanningTypesRadios from "./PlanningTypeRadios/PlanningTypesRadios";
import React from "react";
import { TrainingCheckoutContextProvider } from "./TrainingCheckout/TrainingCheckoutContext";
import TrainingCheckout from "./TrainingCheckout/TrainingCheckout";
import styles from './styles.module.scss'

const Steps: React.FC = () => {
  const trainings = useAppSelector(state => state.personal.createPlanning.form.trainings);

  return (
    <CreateTrainingSwiper>
      <SwiperSlide className={styles.planningTypesSlide}><PlanningTypesRadios /></SwiperSlide>
      {
        trainings.map((training, trainingIndex) => (
          <React.Fragment key={training.id}>
            {
              training.sets.map((set, setIndex) => (
                <SwiperSlide key={set.id}>
                  <SetSlideContextProvider value={{
                    setIndex,
                    training,
                    trainingIndex,
                    lastSetIndex: training.sets.length - 1,
                    lastTrainingIndex: trainings.length - 1,
                  }}>
                    <SetSlide />
                  </SetSlideContextProvider>
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