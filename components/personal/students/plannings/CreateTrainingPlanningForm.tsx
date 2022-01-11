import { Dispatch, SetStateAction, useReducer } from 'react';
import { MdOutlineAdd, MdClose } from 'react-icons/md';
import styles from './CreateTrainingPlanningForm.module.scss';
import trainingsReducer, { addTrainingAction, initialState, removeTrainingAction } from './CreateTrainingPlanningFormReducer';

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
            <div key={training.id} className={styles.training}>
              <button 
                className={styles.closeForm} 
                onClick={() => dispatch(removeTrainingAction(index))}
              >
                <MdClose />
              </button>              
              <p className={styles.name}>Treino {training.letter}</p>
              <label htmlFor={`aerobic-minutes-${training.letter}`}>
                <span>
                  Minutos de Aeróbico
                </span>
                <input type="number" />
              </label>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default CreateTrainingPlanningForm;