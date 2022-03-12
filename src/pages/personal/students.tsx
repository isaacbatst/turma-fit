import axios from "axios";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useSWRConfig } from "swr";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import StudentCard from "../../components/personal/students/StudentCard";
import usePersonalStudents from "../../lib/swr/usePersonalStudents";
import containers from '../../styles/common/containers.module.scss';
import styles from '../../styles/pages/personal/students.module.scss';
import { PersonalStudentWithTrainings } from "../../../types/schema";
import { Personal } from "@prisma/client";

const PersonalAdmin: NextPage = () => {
  const { data: session } = useSession();
  const { mutate } = useSWRConfig();

  const { students } = usePersonalStudents(session?.user.email || '');

  function handleTrainMyself() {
    mutate('/api/user/personal/students', async (students: PersonalStudentWithTrainings[]) => {
      if(!session?.user.isPersonal){
        await axios.post<Personal>('/api/user/personal')
      }

      const { data: newStudent } = await axios.post<PersonalStudentWithTrainings>('/api/user/personal/students', {
        studentEmail: session?.user.email
      })

      return [...students, newStudent];
    })

  }

  return (
    <Layout>
      <Header />
      <section className={containers.container}>
        <h2 className={styles.title}>Seus alunos</h2>
        {students && (
          <div className={styles.studentCards}>
            {students.map(student => (
              <StudentCard key={student.id} student={student} />
            ))}
          </div>
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
      </section>
    </Layout>
  )
}

export default PersonalAdmin;