import { ExerciseTechnique } from "@prisma/client";
import { ChangeEventHandler } from "react";
import { useExercisesSeriesSlideContext } from "../ExercisesSeriesSlide/ExercisesSeriesSlideContext";

type Props = {
  exerciseTechnique: ExerciseTechnique;
  checked: boolean;
  setChecked: (checked: ExerciseTechnique | null) => void
}

const ExerciseTechniqueRadio: React.FC<Props> = ({ exerciseTechnique, exerciseTechnique: { id, name }, checked, setChecked }) => {
  const { exercisesSeriesIndex, trainingIndex, setTrainingSeriesTechnique } = useExercisesSeriesSlideContext()
  
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.checked ? exerciseTechnique : null;

    setChecked(value);
    setTrainingSeriesTechnique(value, exercisesSeriesIndex);
  }
  
  return (
    <>
      <input 
        type="checkbox" 
        id={`exerciseTechniqueRadio-${id}-${trainingIndex}-${exercisesSeriesIndex}`} 
        name="planningType" 
        value={id} 
        checked={checked}
        onChange={handleChange}
      />
      <label htmlFor={`exerciseTechniqueRadio-${id}-${trainingIndex}-${exercisesSeriesIndex}`}>
        {name}
      </label>
    </>
  )
}

export default ExerciseTechniqueRadio;