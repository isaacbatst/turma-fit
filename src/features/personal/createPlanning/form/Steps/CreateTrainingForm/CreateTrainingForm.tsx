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
      {
        training.exercisesSeries.map((exercisesSeries, index) => (
          <CreateExercisesSeriesForm index={index} trainingIndex={index} exercisesSeries={exercisesSeries} key={exercisesSeries.id} />
        ))
      }
      <IconButtonWithText 
        text="Série de Exercícios"
        onClick={handleAddExercisesSeriesClick}
        Icon={MdOutlineAdd}
      />
      <AerobicInput training={training}/>
    </div>
  )
}
