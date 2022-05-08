import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useSWRConfig } from "swr";
import Header from "../../application/frontend/components/Header";
import Layout from "../../application/frontend/components/Layout";
import StudentCard from "../../application/frontend/components/personal/students/StudentCard";
import usePersonalAdvices from "../../lib/swr/usePersonalAdvices";
import containers from '../../styles/common/containers.module.scss';
import styles from '../../styles/pages/personal/students.module.scss';

const PersonalAdmin: NextPage = () => {
  const [mounted, setMounted] = useState(false)
  const { advices } = usePersonalAdvices();

  useEffect(() => {
    setMounted(true);
  }, [])
  

  return (
    <Layout>
      <Header />
      <section className={containers.container}>
        <section aria-label="Seção de Listagem">
          <div role="list" aria-label="Lista de Alunos" className={styles.studentCards}>
            {
              mounted && advices &&  advices.map((advice) => {
                return <StudentCard
                  key={`${advice.personalId}-${advice.studentId}`}
                  advice={advice}
                />
              })
            }
          </div>
        </section>
        {
          advices?.length === 0 && (
            <div className={styles.noStudents}>
              <p>Nenhum aluno encontrado</p>
            </div>
          )
        }
      </section>
    </Layout>
  )
}

export default PersonalAdmin;