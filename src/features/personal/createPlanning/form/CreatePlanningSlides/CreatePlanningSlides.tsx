import React from "react";
import { SwiperSlide } from "swiper/react";
import CreatePlanningSwiper from "./CreatePlanningSwiper/CreatePlanningSwiper";
import PlanningTypesRadios from "./PlanningTypeRadios/PlanningTypesRadios";
import styles from './styles.module.scss';
import TrainingsSlides from "./TrainingsSlides";

const CreatePlanningSlides: React.FC = () => (
  <div>
    <CreatePlanningSwiper>
      <SwiperSlide className={styles.planningTypesSlide}>
        <PlanningTypesRadios />
      </SwiperSlide>
      <TrainingsSlides />
    </CreatePlanningSwiper>
  </div>
)

export default CreatePlanningSlides