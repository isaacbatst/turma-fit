import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { MouseEventHandler, useState } from "react";
import { MdOutlineAdd } from "react-icons/md";
import Header from "../../../../../application/frontend/components/Header";
import Layout from "../../../../../application/frontend/components/Layout";
import TrainingPlanningCard from "../../../../../application/frontend/components/personal/students/plannings/TrainingPlanningCard/TrainingPlanningCard";
import CreateTrainingPlanningForm from "../../../../../application/frontend/features/personal/createPlanning/form";
import { initPlanningAction } from "../../../../../application/frontend/features/personal/createPlanning/form/slice";
import usePersonalStudent from "../../../../../lib/swr/usePersonalStudent";
import { useAppDispatch } from "../../../../../store/hooks";
import containers from '../../../../../styles/common/containers.module.scss';
import styles from '../../../../../styles/pages/personal/students/plannings.module.scss';
import { NextPageWithAuth } from "../../../../../../types/page";

const CreatePlannings: NextPageWithAuth = () => {
  const router = useRouter();
  const { id }  = router.query;

  const [shouldShowForm, setShouldShowForm] = useState(false);
  
  const { data: session } = useSession();
  const { student } = usePersonalStudent(session?.user.email || '', Number(id));

  const dispatch = useAppDispatch();

  const handleAddPlanningClick: MouseEventHandler = () => {
    dispatch(initPlanningAction());
    setShouldShowForm(true);
  }

  return (
    <Layout>
      <Header />
      <section className={containers.container}>
        {
          student && (
            <>
              <h2 className={styles.title}>Planejamentos de {student.user.name}</h2>
              {shouldShowForm && <CreateTrainingPlanningForm setShouldShowForm={setShouldShowForm} />}
              <div className={styles.plannings}>
                {!shouldShowForm && (
                  <button 
                    className={styles.addPlanning} 
                    onClick={handleAddPlanningClick} 
                  >
                    <MdOutlineAdd /> Planejamento Semanal
                  </button>
                )}
                {/* Should show advice's training plannings  */}
                {/* {student.trainingPlannings.map(trainingPlanning => (
                  <TrainingPlanningCard trainingPlanning={trainingPlanning} key={trainingPlanning.id} />
                ))} */}
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