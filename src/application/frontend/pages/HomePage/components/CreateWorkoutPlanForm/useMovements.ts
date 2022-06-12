import { GetMovementsResponse } from "@pages/api/movements";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then(res => res.data);

export const useMovements = () => {
  const { data, error } = useSWR<GetMovementsResponse>("/api/movements", fetcher);

  return {
    movements: data,
    isLoading: !error && !data,
    error,
  }}
