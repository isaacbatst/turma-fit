import { Prisma } from "@prisma/client"

const exerciseTechniquesNames = [
  'Bi-set',
  'Drop-set',
  'Rest n\' Pause',
  'GVT'
]

const exerciseTechniques: 
  Prisma.ExerciseTechniqueCreateInput[] = exerciseTechniquesNames
    .map<Prisma.ExerciseTechniqueCreateInput>(name => ({ name, explanation: '' }))

export default exerciseTechniques;