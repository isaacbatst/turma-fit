import * as PersonalRepository from '../repositories/personal';
import * as StudentRepository from '../repositories/student';

export const createStudent = async (personalEmail: string, studentEmail: string) => {
  const personal = await PersonalRepository.getByEmail(personalEmail);

  if (!personal) {
    return null
  }

  const student = await StudentRepository.getStudentByEmail(studentEmail, {
    trainingPlannings: true,
    user: true
  });

  if(student) return student;

  const created = await StudentRepository.createStudentConnectedToPersonal(studentEmail, personal.id)

  const studentWithUserAndTrainingPlanning = await 
    StudentRepository.getStudentById(created.id, {
      trainingPlannings: true,
      user: true
    })

  return studentWithUserAndTrainingPlanning;
}

export const getStudent = async (requesterEmail: string, studentId: string) => {
  const student = await StudentRepository
    .getStudentByIdAndPersonalEmail(Number(studentId), requesterEmail, {
      trainingPlannings: true,
      user: true
    })
  
  if(!student){
    return null;
  }
  
  return student
}

export const getPersonalStudents = async (personalEmail: string) => {
  const students = await StudentRepository.getStudentsByPersonalEmail(personalEmail, {
    trainingPlannings: true,
    user: true
  });

  return students;
}