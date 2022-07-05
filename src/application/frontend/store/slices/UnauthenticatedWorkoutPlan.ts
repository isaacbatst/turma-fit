import { Day } from "@domain/entities/WorkoutPlan/enums/Day"
import { Grip } from "@domain/entities/WorkoutPlan/enums/Grip"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface UnauthenticatedPlanType {
  id: string,
  defaultMinRestTime: number,
  defaultMaxRestTime: number
}
 
interface UnauthenticatedExercise {
  id: string,
  movementId: string,
  equipmentId?: string,
  grip?: Grip
}

export interface UnauthenticatedSet {
  id: string,
  times: number,
  repetitions: string,
  techniqueId?: string,
  minRestTime?: number,
  maxRestTime?: number,
  exercises: UnauthenticatedExercise[]
}

export interface UnauthenticatedWorkout {
  id: string,
  aerobicMinutes: number,
  day?: Day
  sets: UnauthenticatedSet[],
}

interface UnauthenticatedWorkoutPlan {
  planType: UnauthenticatedPlanType | null,
  workouts: UnauthenticatedWorkout[],
}

interface UnauthenticatedWorkoutPlanState {
  workoutPlan: UnauthenticatedWorkoutPlan | null
}

const initialState: UnauthenticatedWorkoutPlanState = {
  workoutPlan: null
}

const unauthenticatedWorkoutPlanSlice = createSlice({
  initialState,
  name: 'unauthenticatedWorkoutPlan',
  reducers: {
    saveWorkoutPlan(state, action: PayloadAction<{ workoutPlan: UnauthenticatedWorkoutPlan }>) {
      state.workoutPlan = action.payload.workoutPlan
    }
  }
})

export const { saveWorkoutPlan: saveWorkoutPlanAction } = unauthenticatedWorkoutPlanSlice.actions;

export const unauthenticatedWorkoutPlanReducer = unauthenticatedWorkoutPlanSlice.reducer;