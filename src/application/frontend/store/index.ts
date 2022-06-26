import { configureStore } from "@reduxjs/toolkit";
import { createWorkoutPlanReducer } from "./slices/CreateWorkoutPlanForm";

export const store = configureStore({
  reducer: {
    createWorkoutPlanForm: createWorkoutPlanReducer
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
