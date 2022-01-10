import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Header from "../../../../../components/Header";
import Layout from "../../../../../components/Layout";
import TrainingPlanningCard from "../../../../../components/personal/students/plannings/TrainingPlanningCard";
import usePersonalStudent from "../../../../../lib/swr/usePersonalStudent";
import containers from '../../../../../styles/common/containers.module.scss';
import styles from '../../../../../styles/pages/personal/students/plannings.module.scss';
import { NextPageWithAuth } from "../../../../../types/page";

const CreatePlannings: NextPageWithAuth = () => {
  const router = useRouter();
  const { id }  = router.query;
  
  const { data: session } = useSession();
  const { student } = usePersonalStudent(session?.user.email || '', Number(id));

  return (
    <Layout>
      <Header />
      <section className={containers.container}>
        {
          student && (
            <>
              <p>Planejamentos de {student.user.name}</p>
              <div className={styles.plannings}>
                <div>+ Treinamento</div>
                {student.trainingPlannings.map(trainingPlanning => (
                  <TrainingPlanningCard trainingPlanning={trainingPlanning} key={trainingPlanning.id} />
                ))}
              </div>
            </>
          )
        }
      </section>
    </Layout>
  )
}

CreatePlannings.auth = true;

export default CreatePlannings;