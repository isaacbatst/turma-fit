import { useAppSelector } from "../../../../../../../../store/hooks";
import { ExerciseSerieBeingCreated } from "../../../../types";
import badge from './styles.module.scss';

type Props = {
  exercisesSeries: ExerciseSerieBeingCreated,
  trainingIndex: number,
  index: number
}

const MuscleGroupsPreview: React.FC<Props> = ({ exercisesSeries, trainingIndex, index }) => {
  const muscleGroups = exercisesSeries.exercises
    .flatMap(exercise => exercise.muscleGroups)
    .map(muscleGroup => muscleGroup.name)
    .filter((muscleGroup, index, array) => array.indexOf(muscleGroup) === index)
  
  return (
    <div>
      {
        muscleGroups.map(muscleGroup => (
          <span key={muscleGroup} className={badge.badge}>{muscleGroup}</span>
        ))
      }
    </div>
  )
}

export default MuscleGroupsPreview;