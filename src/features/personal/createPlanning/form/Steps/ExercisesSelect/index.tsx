import update from 'immutability-helper';
import Select from 'react-select';
import colors from '../../../../../../styles/common/_colors.module.scss';
import { useGetExercisesQuery } from '../../../api';
import { useExercisesSeriesSlideContext } from '../ExercisesSeriesSlide/ExercisesSeriesSlideContext';
import MuscleGroupsPreview from '../MuscleGroupsPreview';

const ExercisesSelect: React.FC = () => {
  const { data: exercises } = useGetExercisesQuery();
  const { setTraining, training, exercisesSeriesIndex } = useExercisesSeriesSlideContext();

  return (
    <>
      {exercises && (
        <>
          <Select 
            options={exercises} 
            isMulti
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: colors.black,
                primary25: colors.primary25,
                primary50: colors.primary50,
                neutral10: colors.neutral10
              }
            })}
            styles={{
              container: (provided) => ({
                ...provided,
                marginBottom: '20px'
              })
            }}
            menuPortalTarget={document.body} 
            getOptionValue={(option) => option.id.toString()}
            getOptionLabel={(option) => option.name} 
            placeholder="Selecione o(s) exercício(s) da série"
            onChange={(selectedOptions) => {
              console.log(selectedOptions)
              setTraining(update(training, {
                exercisesSeries: {
                  [exercisesSeriesIndex]: {
                    exercises: {
                      $set: [...selectedOptions]
                    }
                  }
                }}))
            }}
          />
          <MuscleGroupsPreview />
        </>
      )}
    </>
  )
}

export default ExercisesSelect;