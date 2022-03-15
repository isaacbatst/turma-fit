import Image from "next/image";
import Link from "next/link";
import { MdAddCircleOutline, MdSettings, MdViewList } from 'react-icons/md';
import { AdviceWithPlanningAndStudentUser, StudentUser } from "../../../../types/schema";
import styles from './StudentCard.module.scss';

type Props = {
  advice: AdviceWithPlanningAndStudentUser
}

const StudentCard: React.FC<Props> = ({ advice }) => {
  const { student, trainingPlannings } = advice;
  const lastTrainingPlanningIndex = trainingPlannings.length - 1;
  const lastTrainingPlanning = trainingPlannings[lastTrainingPlanningIndex];

  const firstNames = student.user.name && student.user.name.split(' ').slice(0, 2).join(' '); 
  const printedName = firstNames || 'Nome não cadastrado';

  return (
    <div className={styles.card} role="listitem" aria-label={printedName}>
      <div className={styles.imageAndName}>
        {student.user.image && 
          <Image src={student.user.image} height={40} width={40} alt={student.user.image || 'Foto de estudante'} />
        }
        <span className={styles.studentName}>{printedName}</span>
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