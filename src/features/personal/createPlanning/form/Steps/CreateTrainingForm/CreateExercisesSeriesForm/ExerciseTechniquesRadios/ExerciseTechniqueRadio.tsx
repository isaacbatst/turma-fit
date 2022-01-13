import { ExerciseTechnique } from "@prisma/client";
import { ChangeEventHandler, MouseEventHandler, useState } from "react";

type Props = {
  exerciseTechnique: ExerciseTechnique;
  trainingId: string;
  checked: boolean;
  setChecked: (checked: number | null) => void
}

const ExerciseTechniqueRadio: React.FC<Props> = ({ exerciseTechnique: { id, name }, trainingId, checked, setChecked }) => {
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
        id={`exerciseTechniqueRadio-${id}-${trainingId}`} 
        name="planningType" 
        value={id} 
        checked={checked}
        onChange={handleChange}
      />
      <label htmlFor={`exerciseTechniqueRadio-${id}-${trainingId}`}>
        {name}
      </label>
    </>
  )
}

export default ExerciseTechniqueRadio;