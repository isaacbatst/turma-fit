import { Dispatch, SetStateAction, useReducer } from 'react';
import { MdOutlineAdd, MdClose } from 'react-icons/md';
import { CreateTrainingForm } from './CreateTrainingForm';
import styles from './CreateTrainingPlanningForm.module.scss';
import trainingsReducer, { addTrainingAction, initialState } from './CreateTrainingPlanningFormReducer';

type Props = {
  setShouldShowForm: Dispatch<SetStateAction<boolean>>
}

const CreateTrainingPlanningForm: React.FC<Props> = ({ setShouldShowForm }) => {
  const [state, dispatch] = useReducer(trainingsReducer, initialState);

  return (
    <div className={styles.formWrapper}>
      <button 
        className={styles.closeForm} 
        onClick={() => setShouldShowForm(false)}
      >
        <MdClose />
      </button>
      <button 
        className={styles.addTraining}
        onClick={() => dispatch(addTrainingAction())}
      >
        <MdOutlineAdd /> Treino
      </button>
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