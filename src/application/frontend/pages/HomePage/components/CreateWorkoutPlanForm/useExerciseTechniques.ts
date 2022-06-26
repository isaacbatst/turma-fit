import { GetExerciseTechniquesResponse } from "@pages/api/exercise-techniques";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then(res => res.data);

export const useExerciseTechniques = () => {
  const { data, error } = useSWR<GetExerciseTechniquesResponse>("/api/exercise-techniques", fetcher);

  return {
    data,
    isLoading: !error && !data,
    error,
  }}
