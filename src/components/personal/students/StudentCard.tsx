import Image from "next/image";
import styles from './StudentCard.module.scss';
import { MdAddCircleOutline, MdSettings, MdViewList } from 'react-icons/md';
import Link from "next/link";
import { PersonalStudentWithPlannings } from "../../../types/schema";

type Props = {
  student: PersonalStudentWithPlannings
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
      {
        lastTrainingPlanning && (
          <p className={styles.lastTrainingPlanning}>
            Último Treino: <span>{ lastTrainingPlanning.type.name }</span>
          </p>
        )
      }
      <div className={styles.buttons}>
        <Link href={`/personal/students/${student.id}/plannings/create`}>
          <a>
            <MdAddCircleOutline />
          </a>
        </Link>
        <Link href={`/personal/students/${student.id}/plannings`}>
          <a>
            <MdViewList />
          </a>
        </Link>
        <Link href={`/personal/students/${student.id}/settings`}>
          <a>
            <MdSettings />
          </a>
        </Link>
      </div>
    </div>
  )
}

export default StudentCard;