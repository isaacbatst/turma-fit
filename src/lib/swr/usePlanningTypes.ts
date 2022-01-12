import { TrainingPlanningType } from "@prisma/client";
import axios from "axios";
import useSWR from "swr";

const fetchPlanningTypes = (url: string) => 
  axios.get<TrainingPlanningType[]>(url)
    .then(res => res.data)


export default function usePlanningTypes(){
  const { data, error } = useSWR('/api/plannings/types', fetchPlanningTypes);

  return {
    planningTypes: data,
    isLoading: !error && !data,
    isError: error
  }
}