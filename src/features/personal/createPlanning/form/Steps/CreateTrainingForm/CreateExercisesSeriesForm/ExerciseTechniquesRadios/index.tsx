import { ExerciseTechnique } from "@prisma/client";
import { useState } from "react";
import styles from '../../../../../../../../styles/components/options.module.scss';
import ExerciseTechniqueRadio from "./ExerciseTechniqueRadio";

type Props = {
  exerciseTechniques: ExerciseTechnique[],
  trainingId: string
}

const ExerciseTechniquesRadios: React.FC<Props> = ({ exerciseTechniques, trainingId }) => {
  const [checked, setChecked] = useState<number | null>(null)

  return (
    <div className={styles.wrapper}>
      <p>Técnica avançada</p>
      {
        exerciseTechniques.map(exerciseTechnique => (
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