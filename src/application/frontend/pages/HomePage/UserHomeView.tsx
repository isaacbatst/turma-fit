import { useMyWorkoutPlans } from "@application/frontend/swr/useMyWorkoutPlans";
import CreateWorkoutPlanForm from "./CreateWorkoutPlanForm";
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
      <CreateWorkoutPlanForm />
      <MyWorkoutPlans userId={user.id} />
    </div>
  )
}

export default UserHomeView;