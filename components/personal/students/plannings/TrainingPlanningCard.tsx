import { TrainingPlanningWithDetails } from "../../../../types/schema"
import styles from './TrainingPlanningCard.module.scss';
import badgeStyles from '../../../../styles/components/badge.module.scss';
import { getTrainingPlanningMuscleGroupsPerTraining } from "../../../../lib/training";

type Props = {
  trainingPlanning: TrainingPlanningWithDetails,
}

const TrainingPlanningCard: React.FC<Props> = ({ trainingPlanning }) => {
  const trainingWithMuscleGroups = getTrainingPlanningMuscleGroupsPerTraining(trainingPlanning);

  return (
    <div className={styles.card}>
      <span className={badgeStyles.badge}>Treino de {trainingPlanning.type.name}</span>
      {
        trainingWithMuscleGroups.filter((_, index) => index <= 1).map(training => (
          <div className={styles.training} key={training.id}>
            <span className={styles.label}>Treino { training.letter }</span>
            <div className={styles.muscleGroups}>
              { training.muscleGroups.map(muscleGroup => (
                <span key={muscleGroup.id} className={badgeStyles.badge}>{muscleGroup.name}</span>
              )) }
            </div>
          </div>
        ))
      }
      <button>Ver completo</button>
    </div>
  )
}

export default TrainingPlanningCard