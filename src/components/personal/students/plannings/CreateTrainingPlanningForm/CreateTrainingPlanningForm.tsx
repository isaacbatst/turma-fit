import { Dispatch, SetStateAction } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import AddButton from '../../../../common/AddButton';
import CloseButton from '../../../../common/CloseButton';
import { CreateTrainingForm } from './CreateTrainingForm/CreateTrainingForm';
import styles from './CreateTrainingPlanningForm.module.scss';
import PlanningTypesRadios from './PlanningTypesRadios';
import { addTrainingAction } from './store/form/actions';
import { CreatePlanningFormProvider, useCreatePlanningFormContext } from './store/form/context';
import { removeSwiper, setSwiperAction } from './store/steps/actions';
import { CreatePlanningStepsProvider, useCreatePlanningStepsContext } from './store/steps/context';

const AddTrainingButton: React.FC = () => {
  const [,dispatch] = useCreatePlanningFormContext();
  return (
    <AddButton
      text='Treino'
      onClick={() => dispatch(addTrainingAction())}
    />
  )
}

const CreatePlanningSteps: React.FC = () => {
  const [state] = useCreatePlanningFormContext();
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
        {
          state.trainings.map((training, index) => (
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