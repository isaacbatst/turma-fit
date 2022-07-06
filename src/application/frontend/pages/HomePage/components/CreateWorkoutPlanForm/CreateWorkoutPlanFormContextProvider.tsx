import { CreateWorkoutPlanFormContext, CreateWorkoutPlanFormContextValue } from "./CreateWorkoutPlanFormContext";
import { useEquipments } from "./useEquipments";
import { useExerciseTechniques } from "./useExerciseTechniques";
import { useMovements } from "./useMovements";

interface Props {
  isAuthenticated: boolean
}

const CreateWorkoutPlanFormContextProvider: React.FC<Props> = ({ children, isAuthenticated }) => {
  const movements = useMovements();
  const equipments = useEquipments();
  const techniques = useExerciseTechniques();

  const value: CreateWorkoutPlanFormContextValue = {
    equipments,
    movements,
    techniques,
    isAuthenticated
  }

  return (
    <CreateWorkoutPlanFormContext.Provider value={value}>
      { children }
    </CreateWorkoutPlanFormContext.Provider>
  )
}

export default CreateWorkoutPlanFormContextProvider;