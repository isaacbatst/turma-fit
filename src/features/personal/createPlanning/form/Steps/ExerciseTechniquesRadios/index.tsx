import { useState } from "react";
import { useGetExerciseTechniquesQuery } from "../../../api";
import { useExercisesSeriesSlideContext } from "../contexts/ExercisesSeriesSlideContext";
import ExerciseTechniqueRadio from "./ExerciseTechniqueRadio";
import styles from './styles.module.scss';

const ExerciseTechniquesRadios: React.FC = () => {
  const [checked, setChecked] = useState<number | null>(null)
  const { data: exerciseTechniques } = useGetExerciseTechniquesQuery();
  const { trainingIndex } = useExercisesSeriesSlideContext();

  return (
    <div className={styles.wrapper}>
      <p>Técnica avançada</p>
      {
        exerciseTechniques && exerciseTechniques.map(exerciseTechnique => (
          <ExerciseTechniqueRadio 
            exerciseTechnique={exerciseTechnique} 
            key={exerciseTechnique.id} 
            trainingIndex={trainingIndex} 
            checked={checked === exerciseTechnique.id}
            setChecked={setChecked}
          />
        ))
      }
    </div>
  )
}

export default ExerciseTechniquesRadios;