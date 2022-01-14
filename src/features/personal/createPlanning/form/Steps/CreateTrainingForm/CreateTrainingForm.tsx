import { MdOutlineAdd } from 'react-icons/md';
import IconButtonWithText from "../../../../../../components/common/IconButtonWithText";
import { useAppDispatch } from "../../../../../../store/hooks";
import { addExercisesSeriesAction } from "../../slice";
import { TrainingBeingCreated } from "../../types";
import { AerobicInput } from "./AerobicInput";
import CreateExercisesSeriesForm from "./CreateExercisesSeriesForm/CreateExercisesSeriesForm";
import styles from './CreateTrainingForm.module.scss';
import Select from 'react-select'

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
      <AerobicInput training={training}/>
      <IconButtonWithText 
        text="Série de Exercícios"
        onClick={handleAddExercisesSeriesClick}
        Icon={MdOutlineAdd}
      />
      {
        training.exercisesSeries.map(exercisesSeries => (
          <CreateExercisesSeriesForm trainingId={training.id} exercisesSeries={exercisesSeries} key={exercisesSeries.id} />
        ))
      }

    </div>
  )
}
