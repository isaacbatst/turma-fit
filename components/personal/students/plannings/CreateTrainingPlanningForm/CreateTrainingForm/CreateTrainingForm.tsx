import AddButton from "../../../../../common/AddButton";
import CloseButton from "../../../../../common/CloseButton";
import { useCreatePlanningContext } from "../CreateTrainingPlanningContext";
import { addExercisesSeriesAction, removeTrainingAction } from "../store/actions";
import { TrainingBeingCreated } from "../store/types";
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
        onClick={() => dispatch(addExercisesSeriesAction(training.id))}
      />
      <AerobicInput training={training}/>
      {
        training.exercisesSeries.map(exercisesSeries => (
          <div key={exercisesSeries.id}>{exercisesSeries.times}x{exercisesSeries.repetitions}</div>
        ))
      }
    </div>
  )
}
