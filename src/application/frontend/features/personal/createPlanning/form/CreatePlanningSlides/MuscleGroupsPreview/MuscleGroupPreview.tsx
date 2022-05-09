import { useAppSelector } from '../../../../../../../../store/hooks';
import { useSetSlideContext } from '../SetSlide/SetSlideContext';
import badge from './styles.module.scss';

const MuscleGroupsPreview: React.FC = () => {
  const { trainingIndex, setIndex } = useSetSlideContext();
  const training = useAppSelector((state) => state.personal.createPlanning.form.trainings[trainingIndex]);

  const muscleGroups = training.sets[setIndex].exercises
    .flatMap(exercise => exercise.movement?.focusedMuscleGroup)
    .filter(Boolean)
    .map(muscleGroup => muscleGroup?.name)
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