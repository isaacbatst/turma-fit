import useSWR from "swr";
import { getUser } from "../axios";

export default function useUser(email?: string){
  const { data: user, error } = useSWR('/api/user/personal', getUser(email));

  return {
    user,
    isLoading: !error && !user,
    isError: error
  }
}