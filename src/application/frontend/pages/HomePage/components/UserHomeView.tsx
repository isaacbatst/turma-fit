import CreateWorkoutPlanForm from "./CreateWorkoutPlanForm/CreateWorkoutPlanForm";
import MyWorkoutPlans from "./MyWorkoutPlans";

type UserHomeViewProps = {
  user: {
    id: string,
    name: string,
  };
}

const UserHomeView: React.FC<UserHomeViewProps> = ({ user }) => {

  return (
    <div>
      <div>Logado: {user.name}</div>
      <MyWorkoutPlans userId={user.id} />
      <CreateWorkoutPlanForm />
    </div>
  )
}

export default UserHomeView;