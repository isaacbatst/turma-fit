import styles from './styles.module.scss'
import {useSetSlideContext} from '../SetSlideContext';


const TimesAndRepetitions: React.FC = () => {
  const { training, training: { id: trainingId, sets }, setIndex, setSetRepetitions: setTrainingSetsRepetitions, setSetTimes: setTrainingSetsTimes } = useSetSlideContext()

  const getId = (inputName: string, tag: string) => `${inputName}-${tag}-${trainingId}-${sets[setIndex].id}`

  return (
    <div className={styles.timesAndRepetitions}>
      <label htmlFor={getId('times','label')}>
        Séries
        <input type="text" name="" value={training.sets[setIndex].times} id={getId('times','input')}
          onChange={(event) => setTrainingSetsTimes(Number(event.target.value), setIndex)}
        />
      </label>
      <label htmlFor={getId('repetitions','label')}>
        Repetições
        <input type="text" name="" id={getId('repetitions','input')} value={training.sets[setIndex].repetitions}
          onChange={(event) => setTrainingSetsRepetitions(event.target.value, setIndex)}
        />
      </label>
    </div>)
}

export default TimesAndRepetitions