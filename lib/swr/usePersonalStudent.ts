import axios from "axios";
import useSWR from "swr";
import { PersonalStudentWithTrainings } from "../../types/schema";

const fetchPersonalStudent = (email: string) => (url: string) => axios.get<PersonalStudentWithTrainings>(url, {
  params: {
    email
  }
}).then(res => res.data)


export default function usePersonalStudent(personalEmail: string, studentId: number){
  const { data, error } = useSWR(`/api/user/personal/student/${studentId}`, fetchPersonalStudent(personalEmail));

  return {
    student: data,
    isLoading: !error && !data,
    isError: error
  }
}