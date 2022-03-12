import { Prisma } from "@prisma/client";

const trainingPlanningTypes: Prisma.TrainingPlanningTypeCreateInput[] = [
  {
    name: 'Hipertrofia',
    explanation: '',
    defaultMinRestTime: 45,
    defaultMaxRestTime: 60,
  },
  {
    name: 'Força',
    explanation: '',
    defaultMinRestTime: 60,
    defaultMaxRestTime: 90,
  },
  {
    name: 'Resistência',
    explanation: '',
    defaultMinRestTime: 30,
    defaultMaxRestTime: 45,
  },
]

export default trainingPlanningTypes;