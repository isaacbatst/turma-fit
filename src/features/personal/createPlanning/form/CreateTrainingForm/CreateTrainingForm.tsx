import IconButtonWithText from "../../../../../components/common/IconButtonWithText";
import IconButton from "../../../../../components/common/IconButton";
import { useAppDispatch } from "../../../../../store/hooks";
import { addExercisesSeriesAction, removeTrainingAction } from "../slice";
import { TrainingBeingCreated } from "../types";
import { AerobicInput } from "./AerobicInput";
import CreateExercisesSeriesForm from "./CreateExercisesSeriesForm/CreateExercisesSeriesForm";
import styles from './CreateTrainingForm.module.scss';
import { MdDelete, MdOutlineAdd } from 'react-icons/md';

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
      <p className={styles.name}>Treino {training.letter} </p>
      <IconButtonWithText 
        text="Série de Exercícios"
        onClick={handleAddExercisesSeriesClick}
        Icon={MdOutlineAdd}
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
