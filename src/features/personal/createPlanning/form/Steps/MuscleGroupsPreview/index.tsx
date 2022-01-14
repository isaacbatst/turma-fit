import { useExercisesSeriesSlideContext } from '../contexts/ExercisesSeriesSlideContext';
import badge from './styles.module.scss';

const MuscleGroupsPreview: React.FC = () => {
  const { exercisesSeries } = useExercisesSeriesSlideContext();

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