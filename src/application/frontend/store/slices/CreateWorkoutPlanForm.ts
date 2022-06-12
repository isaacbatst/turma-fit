import { Day } from "@domain/entities/WorkoutPlan/enums/Day";
import { Grip } from "@domain/entities/WorkoutPlan/enums/Grip";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

const generateId = () => new Date().getTime();

interface SelectedPlanType {
  id: string,
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

export interface CreateWorkoutPlanFormWorkout {
  id: number,
  aerobicMinutes: number,
  day?: Day
  sets: CreateWorkoutPlanFormSet[],
}

interface CreateWorkoutPlanFormState {
  planType?: SelectedPlanType,
  workouts: CreateWorkoutPlanFormWorkout[]
}

const createSet = (): CreateWorkoutPlanFormSet => ({
  id: generateId(),
  exercises: []
})

const createWorkout = (): CreateWorkoutPlanFormWorkout => ({
  id: generateId(),
  aerobicMinutes: 10,
  sets: []
})

const initialState: CreateWorkoutPlanFormState = {
  workouts: []
};

const createWorkoutPlanSlice = createSlice({
  name: 'createWorkoutPlanForm',
  initialState,
  reducers: {
    selectPlanType: (state, action: PayloadAction<{ selectedPlanType: SelectedPlanType }>) => {
      state.planType = action.payload.selectedPlanType
    },
    setAerobicInput: (state, action: PayloadAction<{ workoutIndex: number, value: number }>) => {
      const { value, workoutIndex } = action.payload;
      state.workouts[workoutIndex].aerobicMinutes = value;
    },
    setWorkoutDay: (state, action: PayloadAction<{ workoutIndex: number, day: Day }>) => {
      const { workoutIndex, day } = action.payload;

      state.workouts[workoutIndex].day = day
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
    },
  }
})

export const { 
  selectPlanType: selectPlanTypeAction,
  addSet: addSetAction,
  addWorkout: addWorkoutAction,
  removeSet: removeSetAction,
  removeWorkout: removeWorkoutAction,
  setAerobicInput: setAerobicInputAction,
  setWorkoutDay: setWorkoutDayAction
} = createWorkoutPlanSlice.actions;

export const selectPlanType = (state: RootState) => state.createWorkoutPlanForm.planType;
export const selectAerobicMinutes = (workoutIndex: number) => (state: RootState) => state.createWorkoutPlanForm.workouts[workoutIndex].aerobicMinutes
export const selectWorkoutDay = (workoutIndex: number) => (state: RootState) => state.createWorkoutPlanForm.workouts[workoutIndex].day

export const createWorkoutPlanReducer = createWorkoutPlanSlice.reducer;