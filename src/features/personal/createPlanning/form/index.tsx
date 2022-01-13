import { Dispatch, SetStateAction } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import AddButton from '../../../../components/common/AddButton';
import CloseButton from '../../../../components/common/CloseButton';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { CreateTrainingForm } from './CreateTrainingForm/CreateTrainingForm';
import PlanningTypesRadios from './PlanningTypeRadios/PlanningTypesRadios';
import { addTrainingAction } from './slice';
import styles from './styles.module.scss';
import { SwiperContextProvider, useSwiperContext } from './SwiperContext';

const AddTrainingButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const { setShouldMoveToNext } = useSwiperContext();

  return (
    <AddButton
      text='Treino'
      onClick={() => {
        dispatch(addTrainingAction())
        setShouldMoveToNext(true);
      }}
    />
  )
}

const CreatePlanningSteps: React.FC = () => {
  const trainings = useAppSelector(state => state.personal.createPlanning.form.trainings);
  const { setSwiper } = useSwiperContext();

  return (
    <div>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        allowTouchMove={false}
        onSwiper={(thisSwiper) => {
          setSwiper(thisSwiper)
        }}
        onDestroy={() => setSwiper(null)}
      >
        <SwiperSlide><PlanningTypesRadios /></SwiperSlide>
        {
          trainings.map((training, index) => (
            <SwiperSlide key={training.id} >
              <CreateTrainingForm training={training} index={index} />
              <AddTrainingButton />
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  )
}

type CreateTrainingPlanningFormProps = {
  setShouldShowForm: Dispatch<SetStateAction<boolean>>
}

const CreateTrainingPlanningForm: React.FC<CreateTrainingPlanningFormProps> = ({ setShouldShowForm }) => {
  return (
    <div className={styles.formWrapper}>
      <CloseButton onClick={() => setShouldShowForm(false)} />
      <SwiperContextProvider>
        <CreatePlanningSteps />
      </SwiperContextProvider>
    </div>
  )
}

export default CreateTrainingPlanningForm;  