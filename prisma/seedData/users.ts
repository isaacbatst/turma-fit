import { Prisma } from "@prisma/client";

const users: Prisma.UserCreateInput[] = [
  {
    email: 'aluno@mockado.com',
    name: 'Aluno Mockado',
    student: {
      create: {
      }
    }
  },
  {
    email: 'aluno@semnome.com',
    student: {
      create: {
      }
    }
  },
  {
    email: 'professor@mockdo.com',
    name: 'Professor Mockdo',
    personal: {
      create: {
        advices: {
          create: [
            {
              active: true,
              student: {
                connect: {
                  id: 1
                }
              } 
            },
            {
              active: true,
              student: {
                connect: {
                  id: 2
                }
              }, 
            }
          ]
        }
      }
    }
  },
  {
    email: 'professor@semnome.com',
    personal: {
      create: {}
    }
  },
  {
    email: 'auto@didata.com',
    name: 'autodidata',
    userTrainingPlannings: {
      create: {
        trainingPlanning: {
          connect: {
            id: 1
          }
        }
      }
    }
  },
  {
    email: 'auto@didata.semnome'
  },
  {
    email: 'hybrid@man.com',
    name: 'Híbrido',
    personal: { create: {} },
    student: { create: {} },
  },
  {
    email: 'namelass@hybric.com',
    personal: {create: {}},
    student: {create: {}}
  }
]

export default users