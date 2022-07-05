import CreateWorkoutPlanForm from "./CreateWorkoutPlanForm/CreateWorkoutPlanForm";
import LogoutButton from "./LogoutButton";
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
      <LogoutButton />
      <MyWorkoutPlans userId={user.id} />
      <CreateWorkoutPlanForm isAuthenticated />
    </div>
  )
}

export default UserHomeView;