import styles from '../CreateExercisesSeriesForm.module.scss'

const SeriesAndRepetitions: React.FC = () => (
  <div className={styles.seriesAndRepetitions}>
    <label htmlFor="">
        Séries
      <input type="text" name="" id="" />
    </label>
    <label htmlFor="">
        Repetições
      <input type="text" name="" id="" />
    </label>
  </div>
)

export default SeriesAndRepetitions