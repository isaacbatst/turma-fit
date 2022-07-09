import { Day } from "@domain/entities/WorkoutPlan/enums/Day";
import { Grip } from "@domain/entities/WorkoutPlan/enums/Grip";
import { MuscleGroup } from "@domain/entities/WorkoutPlan/enums/MuscleGroup";
import { createSlice, PayloadAction, nanoid  } from "@reduxjs/toolkit";
import { RootState } from "..";

const generateId = () => nanoid();

export interface SelectedPlanType {
  id: string,
  name: string,
  defaultMinRestTime: number,
  defaultMaxRestTime: number
}

interface CreateWorkoutPlanFormMovement {
  id: string
  name: string,
  muscleGroup: MuscleGroup
}

interface CreateWorkoutPlanFormEquipment {
  id: string
  name: string,
}
 
interface CreateWorkoutPlanFormExercise {
  id: string,
  movement?: CreateWorkoutPlanFormMovement,
  equipment?: CreateWorkoutPlanFormEquipment,
  grip?: Grip
}

interface CreateWorkoutPlanFormTecnique {
  id: string,
  name: string
}

export interface CreateWorkoutPlanFormSet {
  id: string,
  times: string,
  repetitions: string,
  technique?: CreateWorkoutPlanFormTecnique 
  minRestTime?: number,
  maxRestTime?: number,
  exercises: CreateWorkoutPlanFormExercise[]
}

export interface CreateWorkoutPlanFormWorkout {
  id: string,
  aerobicMinutes: number,
  day?: Day
  sets: CreateWorkoutPlanFormSet[],
}

interface CreateWorkoutPlanFormState {
  planType: SelectedPlanType | null,
  workouts: CreateWorkoutPlanFormWorkout[],
  error: string | null
}

const createSet = (): CreateWorkoutPlanFormSet => ({
  id: generateId(),
  exercises: [ createExercise() ],
  repetitions: "",
  times: "",
})

const createWorkout = (): CreateWorkoutPlanFormWorkout => ({
  id: generateId(),
  aerobicMinutes: 10,
  sets: [ createSet() ]
})

const createExercise = (): CreateWorkoutPlanFormExercise => ({
  id: generateId(),
})

const initialState: CreateWorkoutPlanFormState = {
  planType: null,
  workouts: [ createWorkout() ],
  error: null
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
    setTechnique: (state, action: PayloadAction<{ workoutIndex: number, setIndex: number, technique: CreateWorkoutPlanFormTecnique | null }>) => {
      const { technique, setIndex, workoutIndex } = action.payload;
    
      state.workouts[workoutIndex].sets[setIndex].technique = technique || undefined;
    },
    setSetTimes: (state, action: PayloadAction<{ workoutIndex: number, setIndex: number, value: string }>) => {
      const { value, workoutIndex, setIndex } = action.payload;
      state.workouts[workoutIndex].sets[setIndex].times = value;
    },
    setSetRepetitions: (state, action: PayloadAction<{ workoutIndex: number, setIndex: number, value: string }>) => {
      const { value, workoutIndex, setIndex } = action.payload;
      state.workouts[workoutIndex].sets[setIndex].repetitions = value;
    },
    setExerciseMovement: 
      (state, action: PayloadAction<{ workoutIndex: number, setIndex: number, exerciseIndex: number, movement?: CreateWorkoutPlanFormMovement  }>) => {
        const { exerciseIndex, movement, setIndex, workoutIndex } = action.payload;

        state.workouts[workoutIndex].sets[setIndex].exercises[exerciseIndex].movement = movement;
      },
    setExerciseEquipment: 
      (state, action: PayloadAction<{ workoutIndex: number, setIndex: number, exerciseIndex: number, equipment?: CreateWorkoutPlanFormEquipment }>) => {
        const { exerciseIndex, equipment, setIndex, workoutIndex } = action.payload;

        state.workouts[workoutIndex].sets[setIndex].exercises[exerciseIndex].equipment = equipment;
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
    },
    setError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error;
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
  setSetRepetitions: setSetRepetitionsAction,
  setSetTimes: setSetTimesAction,

  addSet: addSetAction,
  addWorkout: addWorkoutAction,
  addExercise: addExerciseAction, 
  removeSet: removeSetAction,
  removeWorkout: removeWorkoutAction,
  removeExercise: removeExerciseAction,

  setError: setErrorAction
} = createWorkoutPlanSlice.actions;

const getWorkoutByIndex = (state: RootState, workoutIndex: number) => state.createWorkoutPlanForm.workouts[workoutIndex];

const getSetByIndex = (state: RootState, workoutIndex: number, setIndex: number) => getWorkoutByIndex(state, workoutIndex).sets[setIndex];

const getExerciseByIndex = (state: RootState, workoutIndex: number, setIndex: number, exerciseIndex: number) =>
  getSetByIndex(state, workoutIndex, setIndex).exercises[exerciseIndex]

export const selectPlanType = (state: RootState) => state.createWorkoutPlanForm.planType;
export const selectWorkouts = (state: RootState) => state.createWorkoutPlanForm.workouts;
export const selectError = (state: RootState) => state.createWorkoutPlanForm.error;

export const selectAerobicMinutes = (workoutIndex: number) => 
  (state: RootState) => getWorkoutByIndex(state, workoutIndex).aerobicMinutes

export const selectWorkoutDay = (workoutIndex: number) => 
  (state: RootState) => getWorkoutByIndex(state, workoutIndex).day
export const selectWorkoutId = (workoutIndex: number) => 
  (state: RootState) => getWorkoutByIndex(state, workoutIndex).id
export const selectWorkoutSetsLength = (workoutIndex: number) => 
  (state: RootState) => getWorkoutByIndex(state, workoutIndex).sets.length

export const selectSet = (setIndex: number, workoutIndex: number) => 
  (state: RootState) => getSetByIndex(state, workoutIndex, setIndex);

export const selectSetExerciseTechnique = (workoutIndex: number, setIndex: number) => 
  (state: RootState) => getSetByIndex(state, workoutIndex, setIndex).technique;

export const selectSetTimes = (workoutIndex: number, setIndex: number) => 
  (state: RootState) => getSetByIndex(state, workoutIndex, setIndex).times;

export const selectSetRepetitions = (workoutIndex: number, setIndex: number) => 
  (state: RootState) => getSetByIndex(state, workoutIndex, setIndex).repetitions;

export const selectSetId = (workoutIndex: number, setIndex: number) => 
  (state: RootState) => getSetByIndex(state, workoutIndex, setIndex).id;

export const selectExercises = (workoutIndex: number, setIndex: number) => 
  (state: RootState) => getSetByIndex(state, workoutIndex, setIndex).exercises;

export const selectExerciseMovement = (workoutIndex: number, setIndex: number, exerciseIndex: number) =>
  (state: RootState) => getExerciseByIndex(state, workoutIndex, setIndex, exerciseIndex).movement

export const selectExerciseEquipment = (workoutIndex: number, setIndex: number, exerciseIndex: number) =>
  (state: RootState) => getExerciseByIndex(state, workoutIndex, setIndex, exerciseIndex).equipment

export const selectExerciseGrip = (workoutIndex: number, setIndex: number, exerciseIndex: number) =>
  (state: RootState) => getExerciseByIndex(state, workoutIndex, setIndex, exerciseIndex).grip


export const createWorkoutPlanReducer = createWorkoutPlanSlice.reducer;