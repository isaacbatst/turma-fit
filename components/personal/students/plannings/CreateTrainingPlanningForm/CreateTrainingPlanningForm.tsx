import { Dispatch, SetStateAction } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import AddButton from '../../../../common/AddButton';
import CloseButton from '../../../../common/CloseButton';
import { CreateTrainingForm } from './CreateTrainingForm/CreateTrainingForm';
import styles from './CreateTrainingPlanningForm.module.scss';
import PlanningTypesRadios from './PlanningTypesRadios';
import { addTrainingAction } from './store/form/actions';
import { CreatePlanningFormProvider, useCreatePlanningForm } from './store/form/context';
import { removeSwiper, setSwiperAction } from './store/steps/actions';
import { CreatePlanningStepsProvider, useCreatePlanningStepsContext } from './store/steps/context';


const TrainingsBeingCreated: React.FC = () => {
  const [state] = useCreatePlanningForm();

  return (
    <div className={styles.trainings}>
      {
        state.trainings.map((training, index) => (
          <CreateTrainingForm key={training.id} training={training} index={index} />
        ))
      }
    </div>
  )
}

const AddTrainingButton: React.FC = () => {
  const [,dispatch] = useCreatePlanningForm();
  return (
    <AddButton
      text='Treino'
      onClick={() => dispatch(addTrainingAction())}
    />
  )
}

const CreatePlanningSteps: React.FC = () => {
  const [, dispatch] = useCreatePlanningStepsContext();

  return (
    <div>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        allowTouchMove={false}
        onSwiper={(swiper) => {
          dispatch(setSwiperAction(swiper));
        }}
        onDestroy={() => dispatch(removeSwiper())}
      >
        <SwiperSlide><PlanningTypesRadios /></SwiperSlide>
        <SwiperSlide><AddTrainingButton /></SwiperSlide>
        <SwiperSlide><TrainingsBeingCreated /></SwiperSlide>
      </Swiper>
    </div>
  )
}

type CreateTrainingPlanningFormProps = {
  setShouldShowForm: Dispatch<SetStateAction<boolean>>
}

const CreateTrainingPlanningForm: React.FC<CreateTrainingPlanningFormProps> = ({ setShouldShowForm }) => {
  return (
    <CreatePlanningFormProvider>
      <div className={styles.formWrapper}>
        <CloseButton onClick={() => setShouldShowForm(false)} />
        <CreatePlanningStepsProvider>
          <CreatePlanningSteps />
        </CreatePlanningStepsProvider>
      </div>
    </CreatePlanningFormProvider>
  )
}

export default CreateTrainingPlanningForm;  