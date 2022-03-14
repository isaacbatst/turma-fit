import { Student } from '@prisma/client';


export const getStudent = async (requesterEmail: string, studentId: string) => {
  const student = null
  
  if(!student){
    return null;
  }
  
  return student
}

export const getPersonalStudents = async (personalEmail: string) => {
  const students: Student[] = []
  return students;
}