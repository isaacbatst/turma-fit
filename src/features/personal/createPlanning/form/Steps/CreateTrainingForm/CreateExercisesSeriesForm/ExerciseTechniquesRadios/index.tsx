import { useState } from "react";
import { useGetExerciseTechniquesQuery } from "../../../../../api";
import ExerciseTechniqueRadio from "./ExerciseTechniqueRadio";
import styles from './styles.module.scss';

type Props = {
  trainingId: string
}

const ExerciseTechniquesRadios: React.FC<Props> = ({ trainingId }) => {
  const [checked, setChecked] = useState<number | null>(null)
  const { data: exerciseTechniques } = useGetExerciseTechniquesQuery();


  return (
    <div className={styles.wrapper}>
      <p>Técnica avançada</p>
      {
        exerciseTechniques && exerciseTechniques.map(exerciseTechnique => (
          <ExerciseTechniqueRadio 
            exerciseTechnique={exerciseTechnique} 
            key={exerciseTechnique.id} 
            trainingId={trainingId} 
            checked={checked === exerciseTechnique.id}
            setChecked={setChecked}
          />
        ))
      }
    </div>
  )
}

export default ExerciseTechniquesRadios;