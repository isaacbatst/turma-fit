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

interface CreateWorkoutPlanFormExercise {
  id: number,
  movementId: string,
  equipmentId: string,
  grip?: Grip
}

export interface CreateWorkoutPlanFormSet {
  id: number,
  times?: number,
  repetitions?: number,
  techniqueId?: string,
  minRestTime?: number,
  maxRestTime?: number,
  exercises: CreateWorkoutPlanFormExercise[]
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

const createExercise = (): CreateWorkoutPlanFormExercise => ({
  id: generateId(),
  equipmentId: "",
  movementId: ""
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
    setTechnique: (state, action: PayloadAction<{ workoutIndex: number, setIndex: number, techniqueId: string | null}>) => {
      const { techniqueId, setIndex, workoutIndex } = action.payload;
    
      state.workouts[workoutIndex].sets[setIndex].techniqueId = techniqueId || undefined;
    },
    setExerciseMovement: 
      (state, action: PayloadAction<{ workoutIndex: number, setIndex: number, exerciseIndex: number, movementId: string }>) => {
        const { exerciseIndex, movementId, setIndex, workoutIndex } = action.payload;

        state.workouts[workoutIndex].sets[setIndex].exercises[exerciseIndex].movementId = movementId;
      },
    setExerciseEquipment: 
      (state, action: PayloadAction<{ workoutIndex: number, setIndex: number, exerciseIndex: number, equipmentId: string }>) => {
        const { exerciseIndex, equipmentId, setIndex, workoutIndex } = action.payload;

        state.workouts[workoutIndex].sets[setIndex].exercises[exerciseIndex].equipmentId = equipmentId;
      },
    setExerciseGrip: 
      (state, action: PayloadAction<{ workoutIndex: number, setIndex: number, exerciseIndex: number, grip: Grip | null }>) => {
        const { exerciseIndex, grip, setIndex, workoutIndex } = action.payload;

        state.workouts[workoutIndex].sets[setIndex].exercises[exerciseIndex].grip = grip || undefined;
      },
    addWorkout: (state) => {
      state.workouts.push(createWorkout())
    },
    addSet: (state, action: PayloadAction<{ workoutIndex: number }>) => {
      const { workoutIndex } = action.payload;

      state.workouts[workoutIndex].sets.push(createSet())
    },
    addExercise: (state, action: PayloadAction<{ workoutIndex: number, setIndex: number}>) => {
      const { workoutIndex, setIndex } = action.payload;

      state.workouts[workoutIndex].sets[setIndex].exercises.push(createExercise())
    },
    removeWorkout: (state, action: PayloadAction<{ workoutIndex: number}>) => {
      const { workoutIndex } = action.payload;
      state.workouts.splice(workoutIndex, 1)
    },
    removeSet: (state, action: PayloadAction<{ setIndex: number, workoutIndex: number }>) => {
      const { setIndex, workoutIndex } = action.payload;
      state.workouts[workoutIndex].sets.splice(setIndex, 1);
    },
    removeExercise: (state, action: PayloadAction<{ setIndex: number, workoutIndex: number, exerciseIndex: number }>) => {
      const { setIndex, workoutIndex, exerciseIndex } = action.payload;
      state.workouts[workoutIndex].sets[setIndex].exercises.splice(exerciseIndex, 1)
    }
  }
})

export const { 
  selectPlanType: selectPlanTypeAction,
  setExerciseEquipment: setExerciseEquipmentAction,
  setExerciseGrip: setExerciseGripAction,
  setExerciseMovement: setExerciseMovementAction,
  setTechnique: setTechniqueAction,
  setWorkoutDay: setWorkoutDayAction,
  setAerobicInput: setAerobicInputAction,

  addSet: addSetAction,
  addWorkout: addWorkoutAction,
  addExercise: addExerciseAction, 
  removeSet: removeSetAction,
  removeWorkout: removeWorkoutAction,
  removeExercise: removeExerciseAction,
} = createWorkoutPlanSlice.actions;

const getWorkoutByIndex = (state: RootState, workoutIndex: number) => state.createWorkoutPlanForm.workouts[workoutIndex];
const getSetByIndex = (state: RootState, workoutIndex: number, setIndex: number) => getWorkoutByIndex(state, workoutIndex).sets[setIndex];
const getExerciseByIndex = (state: RootState, workoutIndex: number, setIndex: number, exerciseIndex: number) =>
  getSetByIndex(state, workoutIndex, setIndex).exercises[exerciseIndex]

export const selectPlanType = (state: RootState) => state.createWorkoutPlanForm.planType;

export const selectAerobicMinutes = (workoutIndex: number) => 
  (state: RootState) => getWorkoutByIndex(state, workoutIndex).aerobicMinutes

export const selectWorkoutDay = (workoutIndex: number) => 
  (state: RootState) => getWorkoutByIndex(state, workoutIndex).day

export const selectSetExerciseTechnique = (workoutIndex: number, setIndex: number) => 
  (state: RootState) => getSetByIndex(state, workoutIndex, setIndex).techniqueId;

export const selectSetTimes = (workoutIndex: number, setIndex: number) => 
  (state: RootState) => getSetByIndex(state, workoutIndex, setIndex).times;

export const selectSetRepetitions = (workoutIndex: number, setIndex: number) => 
  (state: RootState) => getSetByIndex(state, workoutIndex, setIndex).repetitions;

export const selectExercises = (workoutIndex: number, setIndex: number) => 
  (state: RootState) => getSetByIndex(state, workoutIndex, setIndex).exercises;

export const selectExerciseMovement = (workoutIndex: number, setIndex: number, exerciseIndex: number) =>
  (state: RootState) => getExerciseByIndex(state, workoutIndex, setIndex, exerciseIndex).movementId

export const selectExerciseEquipment = (workoutIndex: number, setIndex: number, exerciseIndex: number) =>
  (state: RootState) => getExerciseByIndex(state, workoutIndex, setIndex, exerciseIndex).equipmentId

export const selectExerciseGrip = (workoutIndex: number, setIndex: number, exerciseIndex: number) =>
  (state: RootState) => getExerciseByIndex(state, workoutIndex, setIndex, exerciseIndex).grip


export const createWorkoutPlanReducer = createWorkoutPlanSlice.reducer;