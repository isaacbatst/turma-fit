import { Prisma } from "@prisma/client";

const trainingPlannings: Prisma.TrainingPlanningCreateInput[] =  [
  {
    type: {
      connect: {
        id: 1
      }
    },
    trainings: {
      connect: {
        id: 1
      }
    }
  }
]

export default trainingPlannings;