import Select from 'react-select';
import colors from '../../../../../../../../styles/common/_colors.module.scss';
import { useGetExercisesQuery } from '../../../../../api';

const ExercisesSelect: React.FC = () => {
  const { data: exercises } = useGetExercisesQuery();
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
        menuPortalTarget={document.body} 
        getOptionValue={(option) => option.id.toString()}
        getOptionLabel={(option) => option.name} 
        placeholder="Selecione o(s) exercício(s) da série"
      />}
    </>
  )
}

export default ExercisesSelect;