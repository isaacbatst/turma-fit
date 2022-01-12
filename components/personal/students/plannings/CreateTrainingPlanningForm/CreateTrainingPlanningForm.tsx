import { Dispatch, SetStateAction } from 'react';
import AddButton from '../../../../common/AddButton';
import CloseButton from '../../../../common/CloseButton';
import { CreateTrainingForm } from './CreateTrainingForm/CreateTrainingForm';
import { CreatePlanningProvider, useCreatePlanningContext } from './CreateTrainingPlanningContext';
import styles from './CreateTrainingPlanningForm.module.scss';
import { addTrainingAction } from './store/actions';
import PlanningTypesRadios from './PlanningTypesRadios';

const TrainingsBeingCreated: React.FC = () => {
  const [state] = useCreatePlanningContext();

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
  const [,dispatch] = useCreatePlanningContext();
  return (
    <AddButton
      text='Treino'
      onClick={() => dispatch(addTrainingAction())}
    />
  )
}

type CreateTrainingPlanningFormProps = {
  setShouldShowForm: Dispatch<SetStateAction<boolean>>
}

const CreateTrainingPlanningForm: React.FC<CreateTrainingPlanningFormProps> = ({ setShouldShowForm }) => {
  return (
    <CreatePlanningProvider>
      <div className={styles.formWrapper}>
        <CloseButton onClick={() => setShouldShowForm(false)} />
        <PlanningTypesRadios />
        <AddTrainingButton />
        <TrainingsBeingCreated />
      </div>
    </CreatePlanningProvider>
  )
}

export default CreateTrainingPlanningForm;