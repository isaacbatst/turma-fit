import { useSession } from "next-auth/react";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import useUser from "../../lib/swr/usePersonalStudents";
import { NextPageWithAuth } from "../../types/page";
import containers from '../../styles/common/containers.module.scss';
import styles from '../../styles/pages/personal/students.module.scss';
import StudentCard from "../../components/personal/students/StudentCard";

const PersonalAdmin: NextPageWithAuth = () => {
  const { data: session } = useSession();

  const { students } = useUser(session?.user.email || '');

  return (
    <Layout>
      <Header />
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
    </Layout>
  )
}

PersonalAdmin.auth = true;

export default PersonalAdmin;