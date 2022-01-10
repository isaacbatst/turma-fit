import axios from "axios";
import useSWR from "swr";
import { PersonalStudentWithTrainings } from "../../types/schema";

const fetchPersonalStudents = (email: string) => (url: string) => axios.get<PersonalStudentWithTrainings[]>(url, {
  params: {
    email
  }
}).then(res => res.data)


export default function usePersonalStudents(email: string){
  const { data, error } = useSWR('/api/user/personal/students', fetchPersonalStudents(email));

  return {
    students: data,
    isLoading: !error && !data,
    isError: error
  }
}