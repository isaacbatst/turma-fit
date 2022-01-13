import { ExerciseTechnique } from "@prisma/client";
import axios from "axios";
import useSWR from "swr";

const fetchExerciseTechniques = (url: string) =>
  axios.get<ExerciseTechnique[]>(url)
    .then(res => res.data)


export default function useExerciseTechniques() {
  const { data, error } = useSWR('/api/exerciseTechniques', fetchExerciseTechniques);

  return {
    exerciseTechniques: data,
    isLoading: !error && !data,
    isError: error
  }
}