import { Session } from "next-auth"

export const existingAdvices = [
  {
    "active": true,
    "studentId": 1,
    "personalId": 1
  }
]

export const loggedSession: Session = {
  expires: '2025-04-12T04:13:28.913Z',
  user: {
    email: 'tes@tando.com',
    name: 'Isaac',
    isPersonal: true,
    isStudent: true,
  }
}