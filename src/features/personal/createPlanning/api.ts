import { Exercise, ExerciseTechnique, TrainingPlanningType } from "@prisma/client";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ExerciseWithMuscleGroups } from "../../../types/schema";

export const createPlanningApi = createApi({
  reducerPath: 'personal/createPlanning/apiData',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    getPlanningTypes: builder.query<TrainingPlanningType[], void>({
      query: () => 'plannings/types'
    }),
    getExerciseTechniques: builder.query<ExerciseTechnique[], void>({
      query: () => 'exerciseTechniques'
    }),
    getExercises: builder.query<ExerciseWithMuscleGroups[], void>({
      query: () => 'exercises'
    })
  })
})

export const { 
  useGetExerciseTechniquesQuery, 
  useGetPlanningTypesQuery,
  useGetExercisesQuery
} = createPlanningApi;