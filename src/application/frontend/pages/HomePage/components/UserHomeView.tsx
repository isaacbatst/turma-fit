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
    <div className="min-h-screen flex flex-col items-center text-white bg-red-500 pt-5">
      <div>Olá, {user.name}!</div>
      <div>Conteúdo em breve...</div>
      <LogoutButton /> 
      {/* <MyWorkoutPlans userId={user.id} />
      <CreateWorkoutPlanForm isAuthenticated /> */}
    </div>
  )
}

export default UserHomeView;