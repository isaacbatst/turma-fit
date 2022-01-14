import { ExerciseTechnique } from "@prisma/client";
import { ChangeEventHandler } from "react";

type Props = {
  exerciseTechnique: ExerciseTechnique;
  trainingIndex: number;
  checked: boolean;
  setChecked: (checked: number | null) => void
}

const ExerciseTechniqueRadio: React.FC<Props> = ({ exerciseTechnique: { id, name }, trainingIndex, checked, setChecked }) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if(event.target.checked){
      setChecked(id)
    } else {
      setChecked(null)
    }
  }
  
  return (
    <>
      <input 
        type="checkbox" 
        id={`exerciseTechniqueRadio-${id}-${trainingIndex}`} 
        name="planningType" 
        value={id} 
        checked={checked}
        onChange={handleChange}
      />
      <label htmlFor={`exerciseTechniqueRadio-${id}-${trainingIndex}`}>
        {name}
      </label>
    </>
  )
}

export default ExerciseTechniqueRadio;