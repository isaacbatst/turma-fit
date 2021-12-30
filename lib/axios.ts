import { Personal, Student, TrainingPlanning, TrainingPlanningType, User } from "@prisma/client"
import axios from "axios"

export type PersonalStudent = Student & {
  user: User;
  trainingPlannings: (TrainingPlanning & {
    type: TrainingPlanningType
  })[]
}

type UserWithPersonal = User & {
  personal: Personal & {
    students: PersonalStudent[]
  }
}

export const getUser = (email?: string) => (url: string) => axios.get<UserWithPersonal>(url, {
  params: {
    email
  }
}).then(res => res.data)
