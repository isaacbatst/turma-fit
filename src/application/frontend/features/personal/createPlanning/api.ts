import { Equipment, ExerciseTechnique, WorkoutPlanType } from "@prisma/client";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { MovementWithMuscleGroup } from "../../../../../../types/schema";

export const createPlanningApi = createApi({
  reducerPath: 'personal/createPlanning/apiData',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getPlanningTypes: builder.query<WorkoutPlanType[], void>({
      query: () => '/plannings/types'
    }),
    getExerciseTechniques: builder.query<ExerciseTechnique[], void>({
      query: () => '/exerciseTechniques'
    }),
    getMovements: builder.query<MovementWithMuscleGroup[], void>({
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