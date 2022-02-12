import { SingleValue } from 'react-select';
import { MovementWithMuscleGroup } from '../../../../../../../../types/schema';
import CustomSelect from '../CustomSelect';

type Props = {
  movements: MovementWithMuscleGroup[]
}

const ExercisesSelects: React.FC<Props> = ({ movements }) => {
  function handleMovementChange(selectedMovement: SingleValue<MovementWithMuscleGroup>) {
    if(selectedMovement){
      // set Movement on exercise of set of training
    }
  }

  return (
    <>
      <CustomSelect<MovementWithMuscleGroup> 
        onChange={handleMovementChange}
        options={movements}
        placeholder="Selecione o exercício"
      />
    </>
  )
}

export default ExercisesSelects