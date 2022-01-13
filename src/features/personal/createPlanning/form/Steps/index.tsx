import { Navigation, Pagination } from "swiper";
import { SwiperSlide, Swiper } from "swiper/react";
import { useAppSelector } from "../../../../../store/hooks";
import { CreateTrainingForm } from "../CreateTrainingForm/CreateTrainingForm";
import PlanningTypesRadios from "../PlanningTypeRadios/PlanningTypesRadios";
import AddTrainingButton from "./AddTrainingButton";
import { SwiperContextProvider, useSwiperContext } from "./SwiperContext";
import styles from './styles.module.scss';
import IconButtonWithText from "../../../../../components/common/IconButtonWithText";
import RemoveTrainingButton from "./RemoveTrainingButton";

const Steps: React.FC = () => {
  const trainings = useAppSelector(state => state.personal.createPlanning.form.trainings);
  const { setSwiper } = useSwiperContext();

  const lastTrainingIndex = trainings.length - 1;

  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      allowTouchMove={false}
      modules={[ Navigation, Pagination ]}
      navigation
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
          <SwiperSlide key={training.id} >
            <div className={styles.trainingSlide}>
              <CreateTrainingForm training={training} index={index} />
              <div className={styles.buttonsWrapper}>
                { index === lastTrainingIndex && <AddTrainingButton /> }
                <RemoveTrainingButton index={index} />
              </div>
            </div>
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