import { removeTrainingAction, TrainingAction, TrainingBeingCreated } from "../CreateTrainingPlanningForm/CreateTrainingPlanningFormReducer"
import styles from './CreateTrainingForm.module.scss';
import { MdClose } from "react-icons/md";
import { Dispatch } from "react";
import { AerobicInput } from "./AerobicInput";
import CloseButton from "../../../../common/CloseButton";

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
      <AerobicInput training={training}/>
    </div>
  )
}
