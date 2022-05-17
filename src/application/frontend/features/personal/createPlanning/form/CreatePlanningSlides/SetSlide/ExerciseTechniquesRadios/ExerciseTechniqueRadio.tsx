import { ExerciseTechnique } from "@prisma/client";
import { ChangeEventHandler } from "react";
import { useAppDispatch } from "../../../../../../../store/hooks";
import { setTechniqueAction } from "../../../slice";
import { useSetSlideContext } from "../SetSlideContext";

type Props = {
  exerciseTechnique: ExerciseTechnique;
  checked: boolean;
  setChecked: (checked: ExerciseTechnique | null) => void
}

const ExerciseTechniqueRadio: React.FC<Props> = ({ exerciseTechnique, exerciseTechnique: { id, name }, checked, setChecked }) => {
  const { setIndex, trainingIndex } = useSetSlideContext()
  const dispatch = useAppDispatch();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.checked ? exerciseTechnique : null;

    setChecked(value);
    dispatch(setTechniqueAction({ exerciseTechnique: value, setIndex, trainingIndex }))
  }
  
  return (
    <>
      <input 
        type="checkbox" 
        id={`exerciseTechniqueRadio-${id}-${trainingIndex}-${setIndex}`} 
        name="planningType" 
        value={id} 
        checked={checked}
        onChange={handleChange}
      />
      <label htmlFor={`exerciseTechniqueRadio-${id}-${trainingIndex}-${setIndex}`}>
        {name}
      </label>
    </>
  )
}

export default ExerciseTechniqueRadio;