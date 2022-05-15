import axios from "axios";
import useSWR from "swr";
import { AdviceWithPlanningsAndStudentUser } from "../../../../types/schema";

const fetchPersonalStudents = async (url: string) => {
  const { data } = await axios.get<AdviceWithPlanningsAndStudentUser[]>(url);

  return data
}


export default function usePersonalAdvices(){
  const { data, error } = useSWR('/api/personal/advices', fetchPersonalStudents);

  return {
    advices: data,
    isLoading: !error && !data,
    isError: error
  }
}