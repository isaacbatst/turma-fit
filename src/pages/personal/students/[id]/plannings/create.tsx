import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { MdOutlineAdd } from "react-icons/md";
import Header from "../../../../../components/Header";
import Layout from "../../../../../components/Layout";
import TrainingPlanningCard from "../../../../../components/personal/students/plannings/TrainingPlanningCard/TrainingPlanningCard";
import CreateTrainingPlanningForm from "../../../../../features/personal/createPlanning/form";
import usePersonalStudent from "../../../../../lib/swr/usePersonalStudent";
import containers from '../../../../../styles/common/containers.module.scss';
import styles from '../../../../../styles/pages/personal/students/plannings.module.scss';
import { NextPageWithAuth } from "../../../../../types/page";

const CreatePlannings: NextPageWithAuth = () => {
  const router = useRouter();
  const [shouldShowForm, setShouldShowForm] = useState(false);
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
              <h2>Planejamentos de {student.user.name}</h2>
              {shouldShowForm && <CreateTrainingPlanningForm setShouldShowForm={setShouldShowForm} />}
              <div className={styles.plannings}>
                {!shouldShowForm && (
                  <button 
                    className={styles.addPlanning} 
                    onClick={() => setShouldShowForm(true)} 
                  >
                    <MdOutlineAdd /> Planejamento
                  </button>
                )}
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