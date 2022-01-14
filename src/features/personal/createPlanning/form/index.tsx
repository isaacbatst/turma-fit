import { Dispatch, SetStateAction } from 'react';
import CloseFormButton from './CloseFormButton/CloseFormButton';
import CreatePlanningSteps from './Steps';
import styles from './styles.module.scss';

type CreateTrainingPlanningFormProps = {
  setShouldShowForm: Dispatch<SetStateAction<boolean>>
}

const CreateTrainingPlanningForm: React.FC<CreateTrainingPlanningFormProps> = ({ setShouldShowForm }) => {

  return (
    <div className={styles.formWrapper}>
      <CloseFormButton setShouldShowForm={setShouldShowForm} />
      <CreatePlanningSteps />
    </div>
  )
}

export default CreateTrainingPlanningForm;  