import AddButton from "../../../../../common/AddButton";
import CloseButton from "../../../../../common/CloseButton";
import { useCreatePlanningFormContext } from "../store/form/context";
import { addExercisesSeriesAction, removeTrainingAction } from "../store/form/actions";
import { TrainingBeingCreated } from "../store/form/types";
import { AerobicInput } from "./AerobicInput";
import CreateExercisesSeriesForm from "./CreateExercisesSeriesForm/CreateExercisesSeriesForm";
import styles from './CreateTrainingForm.module.scss';

type Props = {
  training: TrainingBeingCreated,
  index: number,
}

export const CreateTrainingForm: React.FC<Props> = ({ training, index }) => {
  const [, dispatch] = useCreatePlanningFormContext();

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
          <CreateExercisesSeriesForm exercisesSeries={exercisesSeries} key={exercisesSeries.id} />
        ))
      }
    </div>
  )
}
