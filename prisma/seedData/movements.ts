import { Prisma } from "@prisma/client"

const movements: Prisma.MovementCreateInput[]  = [
  {
    name: 'Rosca Testa',
    focusedMuscleGroup: {
      connect: {
        name: 'Tríceps'
      }
    },
  },
  {
    name: 'Rosca Direta',
    focusedMuscleGroup: {
      connect: {
        name: 'Bíceps'
      }
    }
  },
  {
    name: 'Remada',
    focusedMuscleGroup: {
      connect: {
        name: 'Dorsal'
      }
    }
  },
  {
    name: 'Puxada Vertical',
    focusedMuscleGroup: {
      connect: {
        name: 'Dorsal'
      }
    }
  },
  {
    name: 'Supino Reto',
    focusedMuscleGroup: {
      connect: {
        name: 'Peitoral'
      }
    }
  }
]

export default movements