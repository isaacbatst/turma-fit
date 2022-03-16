import axios from "axios";
import useSWR from "swr";
import { AdviceWithPlanningsAndStudentUser } from "../../../types/schema";

const fetchPersonalStudents = (url: string) => 
  axios.get<AdviceWithPlanningsAndStudentUser[]>(url).then(res => res.data)


export default function usePersonalAdvices(){
  const { data, error } = useSWR('/api/personal/advices', fetchPersonalStudents);

  return {
    advices: data,
    isLoading: !error && !data,
    isError: error
  }
}