import { Day } from "@domain/entities/WorkoutPlan/enums/Day"
import { Grip } from "@domain/entities/WorkoutPlan/enums/Grip"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from ".."

interface SelectedPlanType {
  id: string,
  defaultMinRestTime: number,
  defaultMaxRestTime: number
}

interface CreateWorkoutPlanState {
  planType?: SelectedPlanType,
  workouts: {
    aerobicMinutes?: number,
    day?: Day
    sets: {
      times?: number,
      repetitions?: number,
      techniqueId?: string,
      minRestTime?: number,
      maxRestTime?: number,
      exercises: {
        movementId?: string,
        equipmentId?: string,
        grip?: Grip
      }[]
    }[],
  }[]
}

const initialState: CreateWorkoutPlanState = {
  workouts: [
    {
      sets: [
        {
          exercises: []
        }
      ]
    }
  ]
};

export const createWorkoutPlanSlice = createSlice({
  name: 'createWorkoutPlanForm',
  initialState,
  reducers: {
    selectPlanType: (state, action: PayloadAction<SelectedPlanType>) => {
      state.planType = action.payload
    }
  }
})

export const { selectPlanType: selectPlanTypeAction } = createWorkoutPlanSlice.actions;

export const selectPlanType = (state: RootState) => state.createWorkoutPlanForm.planType

export const createWorkoutPlanReducer = createWorkoutPlanSlice.reducer;