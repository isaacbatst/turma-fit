import { Session } from "next-auth"
import { AdviceWithPlanningAndStudentUser } from "../../types/schema"

export const existingAdvices: AdviceWithPlanningAndStudentUser[] = [
  {
    active: true,
    student: {
      id: 10,
      userId: 12,
      age: null,
      user: {
        name: 'Isaac Student',
        id: 12,
        email: 'isaac@stdent.com',
        emailVerified: null,
        image: null
      }
    },
    trainingPlannings: [
      {
        advicePersonalId: 1,
        adviceStudentId: 10,
        id: 1,
        userId: null,
        trainingPlanningTypeId: 1,
        type: {
          name: 'Hipertrofia',
          explanation: '',
          id: 1,
          defaultMinRestTime: 30,
          defaultMaxRestTime: 45,
        }
      }
    ],
    personalId: 1,
    studentId: 10
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