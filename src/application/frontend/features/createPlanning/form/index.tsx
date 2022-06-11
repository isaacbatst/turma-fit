import { Dispatch, SetStateAction } from 'react';
import CloseFormButton from './CloseFormButton/CloseFormButton';
import CreatePlanningSlides from './CreatePlanningSlides/CreatePlanningSlides';
import styles from './styles.module.scss';

type CreateTrainingPlanningFormProps = {
  setShouldShowForm: Dispatch<SetStateAction<boolean>>
}

const CreateTrainingPlanningForm: React.FC<CreateTrainingPlanningFormProps> = ({ setShouldShowForm }) => {

  return (
    <div className={styles.formWrapper}>
      <CloseFormButton setShouldShowForm={setShouldShowForm} />
      <CreatePlanningSlides />
    </div>
  )
}

export default CreateTrainingPlanningForm;  