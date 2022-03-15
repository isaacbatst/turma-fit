import { Session } from "next-auth"
import { AdviceWithPlanningAndStudentUser } from "../../types/schema"

const PERSONAL_ID = 13

const FIRST_STUDENT_ID = 10;
const FIRST_STUDENT_USER_ID = 12;
const FIRST_TRAINING_PLANNING_ID = 15;
const FIRST_PLANNING_TYPE_ID = 132;

const SECOND_STUDENT_ID = 15;
const SECOND_STUDENT_USER_ID = 12;
const SECOND_TRAINING_PLANNING_ID = 15;
const SECOND_PLANNING_TYPE_ID = 132

export const existingAdvices: AdviceWithPlanningAndStudentUser[] = [
  {
    active: true,
    student: {
      id: FIRST_STUDENT_ID,
      userId: FIRST_STUDENT_USER_ID,
      age: null,
      user: {
        name: 'Isaac Student',
        id: FIRST_STUDENT_USER_ID,
        email: 'isaac@stdent.com',
        emailVerified: null,
        image: null
      }
    },
    trainingPlannings: [
      {
        advicePersonalId: PERSONAL_ID,
        adviceStudentId: FIRST_STUDENT_ID,
        id: FIRST_TRAINING_PLANNING_ID,
        userId: null,
        trainingPlanningTypeId: FIRST_PLANNING_TYPE_ID,
        type: {
          name: 'Hipertrofia',
          explanation: '',
          id: FIRST_PLANNING_TYPE_ID,
          defaultMinRestTime: 30,
          defaultMaxRestTime: 45,
        }
      }
    ],
    personalId: PERSONAL_ID,
    studentId: FIRST_STUDENT_ID
  },
  {
    active: true,
    student: {
      id: SECOND_STUDENT_ID,
      userId: SECOND_STUDENT_USER_ID,
      age: null,
      user: {
        name: '',
        id: SECOND_STUDENT_USER_ID,
        email: 'isaac@stdent.com',
        emailVerified: null,
        image: null
      }
    },
    trainingPlannings: [
      {
        advicePersonalId: PERSONAL_ID,
        adviceStudentId: SECOND_STUDENT_ID,
        id: SECOND_TRAINING_PLANNING_ID,
        userId: null,
        trainingPlanningTypeId: SECOND_PLANNING_TYPE_ID,
        type: {
          name: 'Hipertrofia',
          explanation: '',
          id: SECOND_PLANNING_TYPE_ID,
          defaultMinRestTime: 30,
          defaultMaxRestTime: 45,
        }
      }
    ],
    personalId: PERSONAL_ID,
    studentId: SECOND_STUDENT_ID
  },
]

export const loggedSession: Session = {
  expires: '2025-04-12T04:13:28.913Z',
  user: {
    email: 'tes@tando.com',
    name: 'Isaac Personal',
    isPersonal: true,
    isStudent: true,
  }
}