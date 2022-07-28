import Loading from "@application/frontend/components/common/Loading"
import { useMyWorkoutPlans } from "@application/frontend/swr/useMyWorkoutPlans"
import WorkoutPlanCard from "./WorkoutPlanCard"

type MyWorkoutPlansProps = {
  userId: string
}

const MyWorkoutPlans: React.FC<MyWorkoutPlansProps> = ({ userId }) => {
  const { isLoading, workoutPlans, error } = useMyWorkoutPlans(userId);

  return (
    <section aria-label="Meus planos de treino" className="text-center">
      {
        isLoading && <Loading />
      }
      {
        workoutPlans?.length === 0 && <div>Nenhum plano de treino cadastrado</div>
      }
      {
        error && <div role="alert">Erro ao recuperar planos de treino</div>
      }
      {
        workoutPlans && (
          <ul aria-label="Lista de planos">
            {
              workoutPlans.map((workoutPlan) => <WorkoutPlanCard key={workoutPlan.id} workoutPlan={workoutPlan} />)
            }
          </ul>
        )
      }
    </section>
    
  )
}

export default MyWorkoutPlans