import { Grip } from "@prisma/client"

export const gripMapToLabel = {
  SUPINE: 'Supinada',
  PRONATE: 'Pronada',
  NEUTRAL: 'Neutra'
}

export const labelMapToGrip: Record<string, Grip> = {
  Supinada: 'SUPINE',
  Pronada: 'PRONATE',
  Neutra: 'NEUTRAL',
}
