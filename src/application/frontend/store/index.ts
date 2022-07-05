import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createWorkoutPlanReducer } from "./slices/CreateWorkoutPlanForm";
import { unauthenticatedWorkoutPlanReducer } from "./slices/UnauthenticatedWorkoutPlan";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['unauthenticatedWorkoutPlan']
}

const rootReducer = combineReducers({
  createWorkoutPlanForm: createWorkoutPlanReducer,
  unauthenticatedWorkoutPlan: unauthenticatedWorkoutPlanReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
  reducer: persistedReducer,
})

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
