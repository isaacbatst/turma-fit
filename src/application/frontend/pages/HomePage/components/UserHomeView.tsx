import { useState } from "react";
import { HiX } from "react-icons/hi";
import CacheWorkoutSync from "./UserHomeView/CacheWorkoutSync";
import CreateWorkoutPlanForm from "./CreateWorkoutPlanForm/CreateWorkoutPlanForm";
import LogoutButton from "./LogoutButton";
import MyWorkoutPlans from "./UserHomeView/MyWorkoutPlans";

type UserHomeViewProps = {
  user: {
    id: string,
    name: string,
  };
}

const UserHomeView: React.FC<UserHomeViewProps> = ({ user }) => {
  const [isShowingForm, setIsShowingForm] = useState(false);

  return (
    <CacheWorkoutSync>
      <div className="min-h-screen flex flex-col text-white bg-red-500">
        {
          isShowingForm && (
            <div className="relative">
              <button className="absolute right-0 text-white z-50 p-2 cursor-pointer active:scale-125"
                onClick={() => setIsShowingForm(false)}
              >
                <HiX size={'26px'} />
              </button>
              <CreateWorkoutPlanForm isAuthenticated />
            </div>
          )
        }
        <div className="px-3 pt-5">
          <MyWorkoutPlans userId={user.id} />
        </div>
      </div>
    </CacheWorkoutSync>
  )
}

export default UserHomeView;