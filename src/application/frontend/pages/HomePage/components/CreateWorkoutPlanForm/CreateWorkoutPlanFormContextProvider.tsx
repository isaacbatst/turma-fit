import { CreateWorkoutPlanFormContext, CreateWorkoutPlanFormContextValue } from "./CreateWorkoutPlanFormContext";
import { useEquipments } from "./useEquipments";
import { useExerciseTechniques } from "./useExerciseTechniques";
import { useMovements } from "./useMovements";

const CreateWorkoutPlanFormContextProvider: React.FC = ({ children }) => {
  const movements = useMovements();
  const equipments = useEquipments();
  const techniques = useExerciseTechniques();

  const value: CreateWorkoutPlanFormContextValue = {
    equipments,
    movements,
    techniques
  }

  return (
    <CreateWorkoutPlanFormContext.Provider value={value}>
      { children }
    </CreateWorkoutPlanFormContext.Provider>
  )
}

export default CreateWorkoutPlanFormContextProvider;