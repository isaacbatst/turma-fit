import { useExercisesSeriesSlideContext } from '../ExercisesSeriesSlide/ExercisesSeriesSlideContext';
import badge from './styles.module.scss';

const MuscleGroupsPreview: React.FC = () => {
  const { training, exercisesSeriesIndex } = useExercisesSeriesSlideContext();

  const muscleGroups = training.exercisesSeries[exercisesSeriesIndex].exercises
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