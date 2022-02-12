import { Equipment } from '@prisma/client';
import { SingleValue } from 'react-select';
import { MovementWithMuscleGroup } from '../../../../../../../../types/schema';
import { useGetMovementsQuery } from '../../../../../api';
import CustomSelect from '../CustomSelect';

type Props = {
  equipments: Equipment[]
}

const ExercisesSelects: React.FC<Props> = ({ equipments }) => {
  function handleMovementChange(selectedEquipment: SingleValue<Equipment>) {
    if(selectedEquipment){
      // set Movement on exercise of set of training
    }
  }

  return (
    <>
      <CustomSelect<Equipment> 
        onChange={handleMovementChange}
        options={equipments}
        placeholder="Equipamento (opcional)"
        clearable
      />
    </>
  )
}

export default ExercisesSelects