import * as PersonalRepository from '../repositories/personal';
import * as StudentRepository from '../repositories/student';

export const createStudent = async (personalEmail: string, studentEmail: string) => {
  const personal = await PersonalRepository.getByEmail(personalEmail);

  if (!personal) {
    return null
  }

  const student = await StudentRepository.getStudentByEmailWithUserAndPlannings(studentEmail);

  if(student) return student;

  const created = await StudentRepository.createStudentConnectedToPersonal(studentEmail, personal.id)

  const studentWithUserAndTrainingPlanning = await 
    StudentRepository.getStudentByIdWithUserAndPlannings(created.id)

  return studentWithUserAndTrainingPlanning;
}

export const getStudent = async (requesterEmail: string, studentId: string) => {
  const student = await StudentRepository
    .getStudentByIdAndPersonalEmailWithUserAndPlannings(Number(studentId), requesterEmail)
  
  if(!student){
    return null;
  }
  
  return student
}

export const getPersonalStudentsWithTrainings = async (personalEmail: string) => {
  const students = await StudentRepository.getStudentsByPersonalEmailWithUserAndPlannings(personalEmail);

  return students;
}