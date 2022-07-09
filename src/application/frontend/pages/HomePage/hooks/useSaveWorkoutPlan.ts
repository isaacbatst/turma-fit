import { useAppDispatch } from "@application/frontend/store/hooks";
import { clearFormAction } from "@application/frontend/store/slices/CreateWorkoutPlanForm";
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

  const dispatch = useAppDispatch();

  
  const createWorkoutPlan = async () => {
    if(!isAuthenticated || !user) {
      return saveOnLocal();
    }

    return saveOnApi(user);
  }
  
  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    try {
      e.preventDefault();
      await createWorkoutPlan();

      dispatch(clearFormAction());
    } catch (err) {
      console.error(err)
    }
  }

  return {
    handleSubmit,
  }
}