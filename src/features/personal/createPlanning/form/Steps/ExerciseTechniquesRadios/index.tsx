import { ExerciseTechnique } from "@prisma/client";
import { useState } from "react";
import { useGetExerciseTechniquesQuery } from "../../../api";
import { useExercisesSeriesSlideContext } from "../ExercisesSeriesSlide/ExercisesSeriesSlideContext";
import ExerciseTechniqueRadio from "./ExerciseTechniqueRadio";
import styles from './styles.module.scss';

const ExerciseTechniquesRadios: React.FC = () => {
  const [checked, setChecked] = useState<ExerciseTechnique | null>(null)
  const { data: exerciseTechniques } = useGetExerciseTechniquesQuery();

  return (
    <div className={styles.wrapper}>
      <p className={styles.mainLabel}>Técnica avançada</p>
      {
        exerciseTechniques && exerciseTechniques.map(exerciseTechnique => (
          <ExerciseTechniqueRadio 
            exerciseTechnique={exerciseTechnique} 
            key={exerciseTechnique.id} 
            checked={checked?.id === exerciseTechnique.id}
            setChecked={setChecked}
          />
        ))
      }
    </div>
  )
}

export default ExerciseTechniquesRadios;