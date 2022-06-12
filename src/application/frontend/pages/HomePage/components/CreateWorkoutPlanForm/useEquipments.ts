import { GetEquipmentsResponse } from "@pages/api/equipments";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then(res => res.data);

export const useEquipments = () => {
  const { data, error } = useSWR<GetEquipmentsResponse>("/api/equipments", fetcher);

  return {
    equipments: data,
    isLoading: !error && !data,
    error,
  }}
