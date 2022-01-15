import styles from './styles.module.scss'
import {useExercisesSeriesSlideContext} from '../ExercisesSeriesSlide/ExercisesSeriesSlideContext';


const SeriesAndRepetitions: React.FC = () => {
  const { training, training: { id: trainingId, exercisesSeries }, exercisesSeriesIndex, setTrainingSeriesRepetitions, setTrainingSeriesTimes } = useExercisesSeriesSlideContext()

  const getId = (inputName: string, tag: string) => `${inputName}-${tag}-${trainingId}-${exercisesSeries[exercisesSeriesIndex].id}`

  return (
    <div className={styles.seriesAndRepetitions}>
      <label htmlFor={getId('series','label')}>
        Séries
        <input type="text" name="" value={training.exercisesSeries[exercisesSeriesIndex].times} id={getId('series','input')}
          onChange={(event) => setTrainingSeriesTimes(Number(event.target.value), exercisesSeriesIndex)}
        />
      </label>
      <label htmlFor={getId('repetitions','label')}>
        Repetições
        <input type="text" name="" id={getId('repetitions','input')} value={training.exercisesSeries[exercisesSeriesIndex].repetitions}
          onChange={(event) => setTrainingSeriesRepetitions(event.target.value, exercisesSeriesIndex)}
        />
      </label>
    </div>)
}

export default SeriesAndRepetitions