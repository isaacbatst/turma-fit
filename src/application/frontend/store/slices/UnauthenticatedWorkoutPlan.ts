import { WorkoutPlan } from "@domain/entities/WorkoutPlan/WorkoutPlanBeingGetted"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from ".."

interface UnauthenticatedWorkoutPlanState {
  workoutPlan: WorkoutPlan | null,
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
    saveWorkoutPlan(state, action: PayloadAction<{ workoutPlan: WorkoutPlan }>) {
      state.workoutPlan = action.payload.workoutPlan
    },
    setError(state, action: PayloadAction<{ error: string | null }>) {
      state.error = action.payload.error
    },
    clearWorkoutPlan(state) {
      state.workoutPlan = null
    }
  }
})

export const { 
  saveWorkoutPlan: saveWorkoutPlanAction,
  setError: setErrorAction,
  clearWorkoutPlan: clearWorkoutPlanAction,
} = unauthenticatedWorkoutPlanSlice.actions;

export const selectUnauthenticateWorkoutPlan = (state: RootState) => state.unauthenticatedWorkoutPlan.workoutPlan;
export const selectUnauthenticatedCreateWorkoutPlanError = (state: RootState) => state.unauthenticatedWorkoutPlan.error;
export const selectUnauthenticatedWorkout = (id: string) => (state: RootState) => state.unauthenticatedWorkoutPlan.workoutPlan?.
  workouts.find(workout => workout.id === id)
export const selectUnauthenticatedPlanType = (state: RootState) => state.unauthenticatedWorkoutPlan.workoutPlan?.planType

export const unauthenticatedWorkoutPlanReducer = unauthenticatedWorkoutPlanSlice.reducer;