import * as StudentModel from '../models/student'
import * as PersonalModel from '../models/personal'
import { Student, User } from '@prisma/client';

export const getStudent = async (userEmail: string | null | undefined, studentId: string) => {
  if(!userEmail){
    return null;
  }

  const student = await StudentModel.getStudentById(studentId);

  if(!student || !userHasPermission(student, userEmail)){
    return null;
  }
  
  return student
}

async function userHasPermission(student: Student & { user: User }, userEmail: string){
  if(student.user.email === userEmail){
    return true;
  }

  if(!student.personalId){
    return false
  }

  const personal = await PersonalModel.getById(student.personalId);

  if(!personal || personal.user.email !== userEmail) {
    return false
  }

  return true;
} 