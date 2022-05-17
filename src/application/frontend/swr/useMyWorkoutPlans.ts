import { GetMyWorkoutPlansResponse } from "@application/api/usecases/GetMyWorkoutPlans/GetMyWorkoutPlansController";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then(res => res.data);

export const useMyWorkoutPlans = (id: string) => {
  const { data, error } = useSWR<GetMyWorkoutPlansResponse>(`/api/user/${id}/workout-plans`, fetcher);

  return {
    workoutPlans: data?.workoutPlans,
    isLoading: !error && !data,
    error,
  }}
