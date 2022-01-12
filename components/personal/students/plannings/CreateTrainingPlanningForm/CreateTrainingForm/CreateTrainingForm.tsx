import { removeTrainingAction, TrainingAction, TrainingBeingCreated } from "../CreateTrainingPlanningFormReducer"
import styles from './CreateTrainingForm.module.scss';
import { MdOutlineAdd } from "react-icons/md";
import { Dispatch } from "react";
import { AerobicInput } from "./AerobicInput";
import CloseButton from "../../../../../common/CloseButton";
import AddButton from "../../../../../common/AddButton";

type Props = {
  training: TrainingBeingCreated,
  index: number,
  dispatch: Dispatch<TrainingAction>
}

export const CreateTrainingForm: React.FC<Props> = ({ training, index, dispatch }) => {
  return (
    <div key={training.id} className={styles.trainingForm}>
      <CloseButton onClick={() => dispatch(removeTrainingAction(index))} />             
      <p className={styles.name}>Treino {training.letter}</p>
      <AddButton 
        text="Série de Exercícios"
        onClick={() => {}}
      />
      <AerobicInput training={training}/>
    </div>
  )
}
