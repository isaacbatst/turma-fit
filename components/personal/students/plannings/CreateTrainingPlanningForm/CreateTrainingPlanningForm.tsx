import { Dispatch, SetStateAction, useReducer } from 'react';
import { CreateTrainingForm } from './CreateTrainingForm/CreateTrainingForm';
import styles from './CreateTrainingPlanningForm.module.scss';
import trainingsReducer, { addTrainingAction, initialState } from './CreateTrainingPlanningFormReducer';
import CloseButton from '../../../../common/CloseButton';
import AddButton from '../../../../common/AddButton';
import PlanningTypesRadios from './PlanningTypesRadios';

type Props = {
  setShouldShowForm: Dispatch<SetStateAction<boolean>>
}

const CreateTrainingPlanningForm: React.FC<Props> = ({ setShouldShowForm }) => {
  const [state, dispatch] = useReducer(trainingsReducer, initialState);

  return (
    <div className={styles.formWrapper}>
      <CloseButton onClick={() => setShouldShowForm(false)} />
      <PlanningTypesRadios />
      <AddButton
        text='Treino'
        onClick={() => dispatch(addTrainingAction())}
      />
      <div className={styles.trainings}>
        {
          state.trainings.map((training, index) => (
            <CreateTrainingForm key={training.id} training={training} index={index} dispatch={dispatch} />
          ))
        }
      </div>
    </div>
  )
}

export default CreateTrainingPlanningForm;