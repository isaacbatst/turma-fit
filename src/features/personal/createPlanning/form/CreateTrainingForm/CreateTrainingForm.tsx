import AddButton from "../../../../../components/common/AddButton";
import CloseButton from "../../../../../components/common/CloseButton";
import { useAppDispatch } from "../../../../../store/hooks";
import { addExercisesSeriesAction, removeTrainingAction } from "../slice";
import { TrainingBeingCreated } from "../types";
import { AerobicInput } from "./AerobicInput";
import CreateExercisesSeriesForm from "./CreateExercisesSeriesForm/CreateExercisesSeriesForm";
import styles from './CreateTrainingForm.module.scss';

type Props = {
  training: TrainingBeingCreated,
  index: number,
}

export const CreateTrainingForm: React.FC<Props> = ({ training, index }) => {
  const dispatch = useAppDispatch();

  const handleAddExercisesSeriesClick = () => {
    dispatch(addExercisesSeriesAction(training.id))
  }

  return (
    <div key={training.id} className={styles.trainingForm}>
      <CloseButton onClick={() => dispatch(removeTrainingAction(index))} />             
      <p className={styles.name}>Treino {training.letter}</p>
      <AddButton 
        text="Série de Exercícios"
        onClick={handleAddExercisesSeriesClick}
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
