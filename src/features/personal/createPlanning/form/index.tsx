import { Dispatch, SetStateAction } from 'react';
import { MdClose } from 'react-icons/md';
import IconButton from '../../../../components/common/IconButton';
import { useAppDispatch } from '../../../../store/hooks';
import { removeAllTrainingsAction } from './slice';
import CreatePlanningSteps from './Steps';
import styles from './styles.module.scss';

type CreateTrainingPlanningFormProps = {
  setShouldShowForm: Dispatch<SetStateAction<boolean>>
}

const CreateTrainingPlanningForm: React.FC<CreateTrainingPlanningFormProps> = ({ setShouldShowForm }) => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.formWrapper}>
      <IconButton 
        onClick={() => {
          setShouldShowForm(false)
          dispatch(removeAllTrainingsAction());
        }} 
        Icon={MdClose}
        styles={styles.closeForm}
      />
      <CreatePlanningSteps />
    </div>
  )
}

export default CreateTrainingPlanningForm;  