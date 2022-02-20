import { useCallback } from 'react';
import { useAppSelector } from '../../../../../../../store/hooks';
import { useSetSlideContext } from '../SetSlideContext';
import RepetitionsInput from './RepetitionsInput';
import styles from './styles.module.scss';
import TimesInput from './TimesInput';


const TimesAndRepetitions: React.FC = () => {
  const { trainingIndex, setIndex } = useSetSlideContext();
  const training = useAppSelector((state) => state.personal.createPlanning.form.trainings[trainingIndex]);
  const set = training.sets[setIndex];

  const getId = useCallback(
    (
      inputName: string,
      tag: string,
    ) =>
      `${inputName}-${tag}-${training.id}-${set.id}`,
    [training.id, set.id])

  return (
    <div className={styles.timesAndRepetitions}>
      <TimesInput
        getId={getId}
        setIndex={setIndex}
        trainingIndex={trainingIndex}
        times={set.times}
      />
      <RepetitionsInput
        getId={getId}
        setIndex={setIndex}
        trainingIndex={trainingIndex}
        repetitions={set.repetitions}
      />
    </div>)
}

export default TimesAndRepetitions