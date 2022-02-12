import { Grip } from '@prisma/client';
import { SingleValue } from 'react-select';
import CustomSelect from '../CustomSelect';

type Props = {
  grips: Grip[]
}

type GripObject = {
  id: number,
  name: string
}

const gripMapToLabel = {
  SUPINE: 'Supinada',
  PRONATE: 'Pronada',
  NEUTRAL: 'Neutra'
}

const ExercisesSelects: React.FC<Props> = ({ grips }) => {
  const gripsObjects = grips.map((grip, index) => ({
    id:  index,
    name: gripMapToLabel[grip]
  }))

  
  function handleGripChange(selectedGrip: SingleValue<GripObject>) {
    if(selectedGrip){
      // set grip on exercise of set of training
    }
  }
  return (
    <>
      <CustomSelect<GripObject> 
        onChange={handleGripChange}
        options={gripsObjects}
        placeholder="Pegada (opcional)"
        clearable
      />
    </>
  )
}

export default ExercisesSelects