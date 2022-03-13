import axios from "axios";
import useSWR from "swr";
import { PersonalStudentWithTrainings } from "../../../types/schema";

const fetchPersonalStudents = (url: string) => 
  axios.get<PersonalStudentWithTrainings[]>(url).then(res => res.data)


export default function usePersonalStudents(email: string){
  const { data, error } = useSWR('/api/personal/advices', fetchPersonalStudents);

  return {
    students: data,
    isLoading: !error && !data,
    isError: error
  }
}