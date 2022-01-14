import React from 'react'
import { MdOutlineAdd } from 'react-icons/md'
import IconButtonWithText from '../../../../../../components/common/IconButtonWithText'
import { useAppDispatch } from '../../../../../../store/hooks'
import { addExercisesSeriesAction, addTrainingAction } from '../../slice'
import { useExercisesSeriesSlideContext } from '../contexts/ExercisesSeriesSlideContext'
import { useSwiperContext } from '../contexts/SwiperContext'
import ExercisesSelect from '../ExercisesSelect'
import ExerciseTechniquesRadios from '../ExerciseTechniquesRadios'
import SeriesAndRepetitions from '../SeriesAndRepetitions'
import styles from '../styles.module.scss'

const ExercisesSeriesSlide = () => {
  const { training, trainingIndex, exercisesSeriesIndex, lastExerciseSeriesIndex, lastTrainingIndex } = useExercisesSeriesSlideContext();
  const { setShouldMoveToNext } = useSwiperContext()
  const dispatch = useAppDispatch();

  return (
    <div className={styles.formWrapper}>
      <p className={styles.title}>Treino {training.letter}</p>
      <p className={styles.subtitle}>Série de Exercícios</p>
      <ExercisesSelect />
      <SeriesAndRepetitions  />
      <ExerciseTechniquesRadios />
      <div className={styles.buttonsWrapper}>
        <IconButtonWithText
          Icon={MdOutlineAdd}
          text="Série de Exercícios"
          onClick={() => {
            dispatch(addExercisesSeriesAction(training.id))
            setShouldMoveToNext(true);
          }}
        />
        { exercisesSeriesIndex === lastExerciseSeriesIndex && 
          trainingIndex === lastTrainingIndex && (
          <IconButtonWithText
            Icon={MdOutlineAdd}
            text="Treino"
            onClick={() => {
              dispatch(addTrainingAction());
              setShouldMoveToNext(true)
            }}
          />
        ) }
      </div>
    </div>
  )
}

export default ExercisesSeriesSlide
