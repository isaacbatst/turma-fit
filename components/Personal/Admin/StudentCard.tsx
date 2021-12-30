import Image from "next/image";
import { PersonalStudent } from "../../../lib/axios";
import styles from './StudentCard.module.scss';
import { MdAddCircleOutline, MdSettings } from 'react-icons/md';

type Props = {
  student: PersonalStudent
}

const StudentCard: React.FC<Props> = ({ student }) => {
  const lastTrainingPlanningIndex = student.trainingPlannings.length - 1;
  const lastTrainingPlanning = student.trainingPlannings[lastTrainingPlanningIndex];

  return (
    <div className={styles.card}>
      <div className={styles.imageAndName}>
        <Image src={student.user.image || ''} height={40} width={40} alt={student.user.image || 'Foto de estudante'} />
        <span className={styles.studentName}>{student.user.name}</span>
      </div>
      <p className={styles.lastTrainingPlanning}>
        Último Treino: <span>{ lastTrainingPlanning.type.name }</span>
      </p>
      <div className={styles.buttons}>
        <button>
          <MdAddCircleOutline />
        </button>
        <button>
          <MdSettings />
        </button>
      </div>
    </div>
  )
}

export default StudentCard;