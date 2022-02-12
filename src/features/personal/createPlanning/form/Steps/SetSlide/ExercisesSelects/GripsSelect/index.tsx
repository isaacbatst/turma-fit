import { Grip } from '@prisma/client';
import { useDispatch } from 'react-redux';
import { SingleValue } from 'react-select';
import { selectGripAction } from '../../../../slice';
import { useSetSlideContext } from '../../SetSlideContext';
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

const labelMapToGrip: Record<string, Grip> = {
  Supinada: 'SUPINE',
  Pronada: 'PRONATE',
  Neutra: 'NEUTRAL',
}

const ExercisesSelects: React.FC<Props> = ({ grips }) => {
  const dispatch = useDispatch();
  const { trainingIndex, setIndex } = useSetSlideContext();

  const gripsObjects = grips.map((grip, index) => ({
    id:  index,
    name: gripMapToLabel[grip]
  }))

  
  function handleGripChange(selectedGrip: SingleValue<GripObject>) {
    dispatch(selectGripAction({
      trainingIndex,
      setIndex,
      grip: selectedGrip && labelMapToGrip[selectedGrip.name]
    }))    
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