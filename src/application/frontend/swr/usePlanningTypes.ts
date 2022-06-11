import { WorkoutPlanType } from "@prisma/client";
import axios from "axios";
import useSWR from "swr";

const fetchPlanningTypes = (url: string) => 
  axios.get<WorkoutPlanType[]>(url)
    .then(res => res.data)


export default function usePlanningTypes(){
  const { data, error } = useSWR('/api/workout-plan-type', fetchPlanningTypes);

  return {
    planningTypes: data,
    isLoading: !error && !data,
    isError: error
  }
}