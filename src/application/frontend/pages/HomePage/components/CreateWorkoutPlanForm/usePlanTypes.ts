import { GetWorkoutPlanTypesResponse } from "@pages/api/workout-plan-types";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then(res => res.data);

export const usePlanTypes = () => {
  const { data, error } = useSWR<GetWorkoutPlanTypesResponse>("/api/workout-plan-types", fetcher);

  return {
    planTypes: data,
    isLoading: !error && !data,
    error,
  }}
