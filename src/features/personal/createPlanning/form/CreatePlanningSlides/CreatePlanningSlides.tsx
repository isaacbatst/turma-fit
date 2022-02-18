import React from "react";
import { SwiperSlide } from "swiper/react";
import CreateTrainingSwiper from "./CreateTrainingSwiper/CreateTrainingSwiper";
import PlanningTypesRadios from "./PlanningTypeRadios/PlanningTypesRadios";
import styles from './styles.module.scss';
import { SwiperContextProvider } from "./SwiperContext";
import TrainingsSlides from "./TrainingsSlides";

const CreatePlanningSlides: React.FC = () => (
  <SwiperContextProvider>
    <div>
      <CreateTrainingSwiper>
        <SwiperSlide className={styles.planningTypesSlide}>
          <PlanningTypesRadios />
        </SwiperSlide>
        <TrainingsSlides />
      </CreateTrainingSwiper>
    </div>
  </SwiperContextProvider>
)

export default CreatePlanningSlides