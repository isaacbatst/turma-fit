import { GetEquipmentsResponse } from "@pages/api/equipments";
import { GetExerciseTechniquesResponse } from "@pages/api/exercise-techniques";
import { GetMovementsResponse } from "@pages/api/movements";
import { createContext } from "react";

export interface CreateWorkoutPlanFormContextValue {
  movements: {
    data?: GetMovementsResponse,
    isLoading: boolean,
    error: unknown
  },
  techniques: {
    data?: GetExerciseTechniquesResponse,
    isLoading: boolean,
    error: unknown
  },
  equipments: {
    data?: GetEquipmentsResponse,
    isLoading: boolean,
    error: unknown
  },
  isAuthenticated: boolean
}

const createInitialContext = () => ({
  error: false,
  isLoading: false,
  data: []
})

const defaultValue: CreateWorkoutPlanFormContextValue = {
  equipments: createInitialContext(),
  movements: createInitialContext(),
  techniques: createInitialContext(),
  isAuthenticated: false
}

export const CreateWorkoutPlanFormContext = createContext<CreateWorkoutPlanFormContextValue>(defaultValue);

