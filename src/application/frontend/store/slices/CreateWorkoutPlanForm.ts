import { Day } from "@domain/entities/WorkoutPlan/enums/Day"
import { Grip } from "@domain/entities/WorkoutPlan/enums/Grip"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from ".."

const generateId = () => new Date().getTime();

interface SelectedPlanType {
  id: number,
  defaultMinRestTime: number,
  defaultMaxRestTime: number
}

export interface CreateWorkoutPlanFormSet {
  id: number,
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
}

interface CreateWorkoutPlanFormState {
  planType?: SelectedPlanType,
  workouts: {
    id: number,
    aerobicMinutes?: number,
    day?: Day
    sets: CreateWorkoutPlanFormSet[],
  }[]
}

const createSet = () => ({
  id: generateId(),
  exercises: []
})

const createWorkout = () => ({
  id: generateId(),
  sets: [createSet()]
})

const initialState: CreateWorkoutPlanFormState = {
  workouts: [createWorkout()]
};

export const createWorkoutPlanSlice = createSlice({
  name: 'createWorkoutPlanForm',
  initialState,
  reducers: {
    selectPlanType: (state, action: PayloadAction<{ selectedPlanType: SelectedPlanType }>) => {
      state.planType = action.payload.selectedPlanType
    },
    addWorkout: (state) => {
      state.workouts.push(createWorkout())
    },
    addSet: (state, action: PayloadAction<{ workoutIndex: number }>) => {
      const { workoutIndex } = action.payload;

      state.workouts[workoutIndex].sets.push(createSet())
    },
    removeWorkout: (state, action: PayloadAction<{ workoutIndex: number}>) => {
      const { workoutIndex } = action.payload;
      state.workouts.splice(workoutIndex, 1)
    },
    removeSet: (state, action: PayloadAction<{ setIndex: number, workoutIndex: number }>) => {
      const { setIndex, workoutIndex } = action.payload;
      state.workouts[workoutIndex].sets.splice(setIndex, 1);
    }
  }
})

export const { 
  selectPlanType: selectPlanTypeAction,
  addSet: addSetAction,
  addWorkout: addWorkoutAction,
  removeSet: removeSetAction,
  removeWorkout: removeWorkoutAction,
} = createWorkoutPlanSlice.actions;

export const selectPlanType = (state: RootState) => state.createWorkoutPlanForm.planType

export const createWorkoutPlanReducer = createWorkoutPlanSlice.reducer;