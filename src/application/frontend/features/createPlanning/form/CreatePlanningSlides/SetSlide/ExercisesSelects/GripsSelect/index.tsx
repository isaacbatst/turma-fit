import { Grip } from '@prisma/client';
import { useDispatch } from 'react-redux';
import { SingleValue } from 'react-select';
import { gripMapToLabel, labelMapToGrip } from '../../../../../../../../../lib/grips';
import { selectGripAction } from '../../../../slice';
import { useSetSlideContext } from '../../SetSlideContext';
import CustomSelect from '../CustomSelect';

type Props = {
  grips: Grip[]
}

type GripObject = {
  id: string,
  name: string
}

const ExercisesSelects: React.FC<Props> = ({ grips }) => {
  const dispatch = useDispatch();
  const { trainingIndex, setIndex } = useSetSlideContext();

  const gripsObjects = grips.map((grip, index) => ({
    id:  grip,
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