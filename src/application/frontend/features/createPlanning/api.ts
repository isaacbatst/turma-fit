import { Equipment, ExerciseTechnique, Movement, WorkoutPlanType } from "@prisma/client";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const createPlanningApi = createApi({
  reducerPath: 'personal/createPlanning/apiData',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getPlanningTypes: builder.query<WorkoutPlanType[], void>({
      query: () => '/workout-plan-types'
    }),
    getExerciseTechniques: builder.query<ExerciseTechnique[], void>({
      query: () => '/exercise-techniques'
    }),
    getMovements: builder.query<Movement[], void>({
      query: () => '/movements'
    }),
    getEquipments: builder.query<Equipment[], void>({
      query: () => '/equipments'
    })
  })
})

export const { 
  useGetExerciseTechniquesQuery, 
  useGetPlanningTypesQuery,
  useGetMovementsQuery,
  useGetEquipmentsQuery,
} = createPlanningApi;