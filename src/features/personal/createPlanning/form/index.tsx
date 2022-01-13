import { Dispatch, SetStateAction } from 'react';
import { MdClose } from 'react-icons/md';
import IconButton from '../../../../components/common/IconButton';
import CreatePlanningSteps from './Steps';
import styles from './styles.module.scss';

type CreateTrainingPlanningFormProps = {
  setShouldShowForm: Dispatch<SetStateAction<boolean>>
}

const CreateTrainingPlanningForm: React.FC<CreateTrainingPlanningFormProps> = ({ setShouldShowForm }) => {
  return (
    <div className={styles.formWrapper}>
      <IconButton 
        onClick={() => setShouldShowForm(false)} 
        Icon={MdClose}
        styles={styles.closeForm}
      />
      <CreatePlanningSteps />
    </div>
  )
}

export default CreateTrainingPlanningForm;  