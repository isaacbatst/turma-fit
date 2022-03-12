import { Prisma } from "@prisma/client";

const muscleGroupsNames = [
  'Tríceps',
  'Bíceps',
  'Dorsal',
  'Peitoral',
  'Coxa',
  'Panturrilha',
  'Abdômen',
  'Antebraço',
  'Deltóide',
  'Trapézio'
]

const muscleGroups: Prisma.MuscleGroupCreateInput[] = muscleGroupsNames.map(name => ({ name }))

export default muscleGroups;