import { Grip } from "@prisma/client"

export const readableGrip: Record<Grip, string> = {
  SUPINE: 'Supinada',
  PRONATE: 'Pronada',
  NEUTRAL: 'Neutra'
}

export const labelMapToGrip: Record<string, Grip> = {
  Supinada: 'SUPINE',
  Pronada: 'PRONATE',
  Neutra: 'NEUTRAL',
}
