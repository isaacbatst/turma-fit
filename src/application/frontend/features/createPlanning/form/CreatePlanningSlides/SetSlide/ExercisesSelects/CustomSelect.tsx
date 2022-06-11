import Select, { SingleValue } from 'react-select';
import colors from '@styles/common/_colors.module.scss';

type BaseOptionType = {
  name: string,
  id: string
}

type Props<OptionType extends BaseOptionType> = {
  options: OptionType[],
  onChange: (option: SingleValue<OptionType>) => void,
  placeholder: string,
  clearable?: boolean
}

function CustomSelect<OptionType extends BaseOptionType>({
  onChange, options, placeholder, clearable
}: Props<OptionType>) {
  return (
    <Select
      options={options}
      isClearable={clearable}
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
      placeholder={placeholder}
      onChange={onChange} />
  );
}

export default CustomSelect;