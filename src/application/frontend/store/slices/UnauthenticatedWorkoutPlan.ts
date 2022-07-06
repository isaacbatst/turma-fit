import { ValidUnauthenticatedWorkoutPlan } from "@application/frontend/pages/HomePage/hooks/useSaveWorkoutPlanLocal"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from ".."

interface UnauthenticatedWorkoutPlanState {
  workoutPlan: ValidUnauthenticatedWorkoutPlan | null,
  error: string | null
}

const initialState: UnauthenticatedWorkoutPlanState = {
  workoutPlan: null,
  error: null
}

const unauthenticatedWorkoutPlanSlice = createSlice({
  initialState,
  name: 'unauthenticatedWorkoutPlan',
  reducers: {
    saveWorkoutPlan(state, action: PayloadAction<{ workoutPlan: ValidUnauthenticatedWorkoutPlan }>) {
      state.workoutPlan = action.payload.workoutPlan
    },
    setError(state, action: PayloadAction<{ error: string | null }>) {
      state.error = action.payload.error
    }
  }
})

export const { 
  saveWorkoutPlan: saveWorkoutPlanAction,
  setError: setErrorAction
} = unauthenticatedWorkoutPlanSlice.actions;

export const selectUnauthenticateWorkoutPlan = (state: RootState) => state.unauthenticatedWorkoutPlan.workoutPlan;
export const selectUnauthenticatedCreateWorkoutPlanError = (state: RootState) => state.unauthenticatedWorkoutPlan.error;

export const unauthenticatedWorkoutPlanReducer = unauthenticatedWorkoutPlanSlice.reducer;