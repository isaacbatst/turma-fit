import * as PersonalModel from '../models/personal';
import * as StudentModel from '../models/student';

export const createStudent = async (personalEmail: string, studentEmail: string) => {
  const personal = await PersonalModel.getByEmail(personalEmail);

  if (!personal) {
    return null
  }

  const student = StudentModel.getStudentByEmail(studentEmail);

  if(student) return student;

  const created = StudentModel.create(studentEmail, personal.id)

  return created;
}

export const getStudent = async (requesterEmail: string, studentId: string) => {
  const students = await StudentModel.getStudentsByPersonalEmail(requesterEmail);

  const student = students.find(student => student.id === Number(studentId))
  
  if(!student){
    return null;
  }
  
  return student
}

export const getPersonalStudents = async (personalEmail: string) => {
  const students = await StudentModel.getStudentsByPersonalEmail(personalEmail)

  return students
}