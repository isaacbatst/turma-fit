import { TrainingPlanningWithType } from "../../../../types/schema"
import styles from './TrainingPlanningCard.module.scss';

type Props = {
  trainingPlanning: TrainingPlanningWithType,
}

const TrainingPlanningCard: React.FC<Props> = ({ trainingPlanning }) => {
  return (
    <div className={styles.card}>
      {trainingPlanning.type.name}
    </div>
  )
}

export default TrainingPlanningCard