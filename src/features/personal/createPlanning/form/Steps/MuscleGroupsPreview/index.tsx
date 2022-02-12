import { useSetSlideContext } from '../SetSlide/SetSlideContext';
import badge from './styles.module.scss';

const MuscleGroupsPreview: React.FC = () => {
  const { training, setIndex } = useSetSlideContext();

  const muscleGroups = training.sets[setIndex].exercises
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