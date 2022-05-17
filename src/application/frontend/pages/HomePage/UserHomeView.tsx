import { useMyWorkoutPlans } from "@application/frontend/swr/useMyWorkoutPlans";

type UserHomeViewProps = {
  user: {
    id: string,
    name: string,
  };
}

const UserHomeView: React.FC<UserHomeViewProps> = ({ user }) => {
  const { isLoading, workoutPlans } = useMyWorkoutPlans(user.id);

  return (
    <div>
      <div>Logado: {user.name}</div>
      {isLoading ? (
        <div role="status">Loading...</div>
      ) : (
        <section aria-label="Meus planos de treino">
          <h2>Meus planos de treino</h2>
          {
            workoutPlans && workoutPlans.length > 0 ? (
              <ul aria-label="Lista de planos">
                {
                  workoutPlans.map(workoutPlan => (
                    <li key={workoutPlan.id}>
                      {workoutPlan.id}
                    </li>
                  ))
                }
              </ul>
            )
              : (
                <div>Nenhum plano de treino cadastrado</div>
              )
          }
        </section>
      )}
    </div>
  )
}

export default UserHomeView;