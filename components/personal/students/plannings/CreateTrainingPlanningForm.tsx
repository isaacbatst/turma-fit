import { Dispatch, SetStateAction } from 'react';
import { MdOutlineAdd, MdClose } from 'react-icons/md';
import styles from './CreateTrainingPlanningForm.module.scss';

type Props = {
  setShouldShowForm: Dispatch<SetStateAction<boolean>>
}

const CreateTrainingPlanningForm: React.FC<Props> = ({ setShouldShowForm }) => {

  return (
    <div className={styles.formWrapper}>
      <button className={styles.closeForm} onClick={() => setShouldShowForm(false)}><MdClose /></button>
      <button className={styles.addTraining}><MdOutlineAdd /> Treino</button>
    </div>
  )
}

export default CreateTrainingPlanningForm;