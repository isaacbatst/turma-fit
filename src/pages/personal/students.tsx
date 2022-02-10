import { useSession } from "next-auth/react";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import useUser from "../../lib/swr/usePersonalStudents";
import { NextPageWithAuth } from "../../types/page";
import containers from '../../styles/common/containers.module.scss';
import styles from '../../styles/pages/personal/students.module.scss';
import StudentCard from "../../components/personal/students/StudentCard";
import axios from "axios";
import { useSWRConfig } from "swr";
import { PersonalStudentWithTrainings } from "../../types/schema";

const PersonalAdmin: NextPageWithAuth = () => {
  const { data: session } = useSession();
  const { mutate } = useSWRConfig();

  const { students } = useUser(session?.user.email || '');

  function handleTrainMyself(){
    mutate('/api/user/personal/students', async (students: PersonalStudentWithTrainings[]) => {
      const { data: newStudent } = await axios.post<PersonalStudentWithTrainings>('/api/user/personal/students', {
        email: session?.user.email 
      })

      return [...students, newStudent];
    })

  }

  return (
    <Layout>
      <Header />
      <h2 className={styles.title}>Seus alunos</h2>
      { students && (
        <section className={containers.container}>
          <div className={styles.studentCards}>
            { students.map(student => (
              <StudentCard key={student.id} student={student} />
            )) }
          </div>
        </section>
      )    
      }
      {
        students?.length === 0 && (
          <div className={styles.noStudents}>
            <p>Você não tem alunos!</p>
            <button onClick={handleTrainMyself}>Quero fazer um treino pra mim mesmo</button>
          </div>
        )
      }
    </Layout>
  )
}

PersonalAdmin.auth = true;

export default PersonalAdmin;