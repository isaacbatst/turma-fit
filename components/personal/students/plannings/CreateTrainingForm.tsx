import { removeTrainingAction, TrainingAction, TrainingBeingCreated } from "./CreateTrainingPlanningFormReducer"
import styles from './CreateTrainingForm.module.scss';
import { MdClose } from "react-icons/md";
import { Dispatch } from "react";

type Props = {
  training: TrainingBeingCreated,
  index: number,
  dispatch: Dispatch<TrainingAction>
}

export const CreateTrainingForm: React.FC<Props> = ({ training, index, dispatch }) => {
  return (
    <div key={training.id} className={styles.trainingForm}>
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
  )
}
