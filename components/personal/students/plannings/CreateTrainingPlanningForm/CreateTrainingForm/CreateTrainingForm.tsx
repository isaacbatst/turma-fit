import AddButton from "../../../../../common/AddButton";
import CloseButton from "../../../../../common/CloseButton";
import { useCreatePlanningContext } from "../CreateTrainingPlanningContext";
import { removeTrainingAction, TrainingBeingCreated } from "../CreateTrainingPlanningFormReducer";
import { AerobicInput } from "./AerobicInput";
import styles from './CreateTrainingForm.module.scss';

type Props = {
  training: TrainingBeingCreated,
  index: number,
}

export const CreateTrainingForm: React.FC<Props> = ({ training, index }) => {
  const [, dispatch] = useCreatePlanningContext();

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
