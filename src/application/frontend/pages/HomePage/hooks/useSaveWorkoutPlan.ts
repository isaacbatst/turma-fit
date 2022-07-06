import { useUser } from "@application/frontend/swr/useUser";
import { useContext } from "react";
import { CreateWorkoutPlanFormContext } from "../components/CreateWorkoutPlanForm/CreateWorkoutPlanFormContext";
import { useSaveWorkoutPlanApi } from "./useSaveWorkoutPlanApi";
import { useSaveWorkoutPlanLocal } from "./useSaveWorkoutPlanLocal";

export const useSaveWorkoutPlan = () => {
  const { isAuthenticated } = useContext(CreateWorkoutPlanFormContext);

  const { saveOnApi } = useSaveWorkoutPlanApi();
  const { saveOnLocal } = useSaveWorkoutPlanLocal();

  const { user } = useUser();

  
  const createWorkoutPlan = async () => {
    if(!isAuthenticated || !user) {
      return saveOnLocal();
    }

    return saveOnApi(user);
  }
  
  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    createWorkoutPlan();
  }

  return {
    handleSubmit,
  }
}