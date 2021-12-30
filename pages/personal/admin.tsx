import { useSession } from "next-auth/react";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import useUser from "../../lib/swr/useUser";
import { NextPageWithAuth } from "../../types/page";
import containers from '../../styles/common/containers.module.scss';
import styles from '../../styles/pages/personal/admin.module.scss';
import StudentCard from "../../components/Personal/Admin/StudentCard";

const PersonalAdmin: NextPageWithAuth = () => {
  const { data: session } = useSession();

  const { user } = useUser(session?.user.email);

  return (
    <Layout>
      <Header />
      { user && (
        <section className={containers.container}>
          <h2>Estudantes</h2>
          <div className={styles.studentCards}>
            { user.personal.students.map(student => (
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