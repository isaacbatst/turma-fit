import { Prisma } from "@prisma/client";

const exercises: Prisma.ExerciseCreateInput[] = [
  {
    movement: {
      connect: {
        id: 1
      }
    },
    equipment: {
      connect: {
        id: 1
      }
    },
    grip: "NEUTRAL",
  },
  {
    movement: {
      connect: {
        id: 2
      }
    },
    equipment: {
      connect: {
        id: 2
      }
    },
  },
  {
    movement: {
      connect: {
        id: 3
      }
    },
    grip: "SUPINE",
  }
]

export default exercises;