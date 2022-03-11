import * as PersonalModel from '../models/personal';
import * as StudentModel from '../models/student';

export const createStudent = async (personalEmail: string, studentEmail: string) => {
  const personal = await PersonalModel.getByEmail(personalEmail);

  if (!personal) {
    return null
  }

  const student = await StudentModel.getStudentByEmail(studentEmail);

  if(student) return student;

  const created = await StudentModel.create(studentEmail, personal.id, {
    trainingPlannings: true,
    user: true
  })

  return created;
}

export const getStudent = async (requesterEmail: string, studentId: string) => {
  const student = StudentModel.getStudentsByIdAndPersonalEmail(Number(studentId), requesterEmail, {
    user: true,
    trainingPlannings: true
  })
  
  if(!student){
    return null;
  }
  
  return student
}

export const getPersonalStudentsWithTrainings = async (personalEmail: string) => {
  const students = await StudentModel.getStudentsByPersonalEmail(personalEmail, { 
    trainingPlannings: true, 
    user: true 
  });

  return students;
}