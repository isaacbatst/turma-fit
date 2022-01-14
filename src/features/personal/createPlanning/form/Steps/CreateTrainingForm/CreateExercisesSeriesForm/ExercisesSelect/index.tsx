import Select from 'react-select';
import { useAppDispatch } from '../../../../../../../../store/hooks';
import colors from '../../../../../../../../styles/common/_colors.module.scss';
import { useGetExercisesQuery } from '../../../../../api';
import { setExercisesAction } from '../../../../slice';

type Props = {
  trainingIndex: number,
  index: number
}

const ExercisesSelect: React.FC<Props> = ({ trainingIndex, index }) => {
  const { data: exercises } = useGetExercisesQuery();
  const dispatch = useAppDispatch(); 
  

  return (
    <>
      {exercises && <Select 
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
          dispatch(setExercisesAction({
            exerciseSeriesIndex: index,
            trainingIndex: trainingIndex,
            exercises: [...selectedOptions]
          }))
        }}
      />}
    </>
  )
}

export default ExercisesSelect;