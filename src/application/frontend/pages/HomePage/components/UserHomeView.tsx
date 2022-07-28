import AuthenticatedCreateWorkoutPlanForm from "./UserHomeView/AuthenticatedCreateWorkoutPlanForm";
import CacheWorkoutSync from "./UserHomeView/CacheWorkoutSync";
import MyWorkoutPlans from "./UserHomeView/MyWorkoutPlans";

type UserHomeViewProps = {
  user: {
    id: string,
    name: string,
  };
}

const UserHomeView: React.FC<UserHomeViewProps> = ({ user }) => {
  return (
    <CacheWorkoutSync>
      <div className="min-h-screen flex flex-col text-white bg-red-500">
        <AuthenticatedCreateWorkoutPlanForm />
        <div className="px-3 pt-5">
          <MyWorkoutPlans userId={user.id} />
        </div>
      </div>
    </CacheWorkoutSync>
  )
}

export default UserHomeView;