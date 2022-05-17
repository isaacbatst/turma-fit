import { configureStore } from "@reduxjs/toolkit";
import { createPlanningApi } from "../features/personal/createPlanning/api";
import personalReducer from "../features/personal/reducer";

export const store = configureStore({
  reducer: {
    personal: personalReducer,
    [createPlanningApi.reducerPath]: createPlanningApi.reducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(createPlanningApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
