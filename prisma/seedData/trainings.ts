import { Prisma } from "@prisma/client";

const trainings: Prisma.TrainingCreateInput[] = [
  {
    aerobicMinutes: 10,
    day: 'MONDAY',
    letter: 'A',
    sets: {
      create: [
        {
          exercises: {
            connect: {
              id: 1
            }
          },
          repetitions: "F",
          times: 4,
          technique: {
            connect: {
              id: 1
            }
          },
        },
        {
          exercises: {
            connect: {
              id: 2
            }
          },
          repetitions: "10",
          times: 10,
        }
      ]
    }
  }
]

export default trainings;