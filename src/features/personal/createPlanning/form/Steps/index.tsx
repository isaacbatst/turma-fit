import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useAppSelector } from "../../../../../store/hooks";
import PlanningTypesRadios from "./PlanningTypeRadios/PlanningTypesRadios";
import styles from './styles.module.scss';
import { SwiperContextProvider, useSwiperContext } from "./contexts/SwiperContext";
import TrainingSlide from "./TrainingSlide";

const Steps: React.FC = () => {
  const trainings = useAppSelector(state => state.personal.createPlanning.form.trainings);
  const { setSwiper } = useSwiperContext();

  const lastTrainingIndex = trainings.length - 1;

  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      modules={[ Navigation, Pagination ]}
      pagination={{
        clickable: true
      }}
      onSwiper={(thisSwiper) => {
        setSwiper(thisSwiper)
      }}
      className={styles.swiper}
      onDestroy={() => setSwiper(null)}
    >
      <SwiperSlide><PlanningTypesRadios /></SwiperSlide>
      {
        trainings.map((training, index) => (
          <SwiperSlide key={training.id}>
            <TrainingSlide
              index={index}
              lastTrainingIndex={lastTrainingIndex}
              training={training}
            />
          </SwiperSlide>
        ))
      }
    </Swiper>
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