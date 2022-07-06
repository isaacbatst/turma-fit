import { GetUserControllerResponse } from "@application/api/usecases/GetUser/GetUserController";
import axios from "axios";
import useSWRImmutable from 'swr/immutable'

const fetcher = (url: string) => axios.get(url).then(res => res.data);

export const useUser = () => {
  const { data, error } = useSWRImmutable<GetUserControllerResponse>("/api/user", fetcher);

  return {
    user: data?.user,
    isLoading: !error && !data,
    error,
  }}
