import { Prisma } from "@prisma/client"

const equipmentsNames = [
  'Scott',
  'Halteres',
  'Barra',
  'Máquina',
  'Smith'
]

const equipments: Prisma.EquipmentCreateInput[]  = equipmentsNames.map(name => ({
  name
}))

export default equipments