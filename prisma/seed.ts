import { PrismaClient } from "@prisma/client";
import equipments from "./seedData/equipments";
import exercises from "./seedData/exercises";
import exerciseTechniques from "./seedData/exerciseTechniques";
import movements from "./seedData/movements";
import muscleGroups from "./seedData/muscleGroups";
import trainingPlannings from "./seedData/trainingPlanning";
import trainingPlanningTypes from "./seedData/trainingPlanningTypes";
import trainings from "./seedData/trainings";
import users from "./seedData/users";

async function main(){
  const prisma = new PrismaClient();

  try {
    await seedAll(prisma);

  } catch (err) {
    console.error(err)
  }

  await prisma.$disconnect();
}

async function seedAll(prisma: PrismaClient){
  console.log('Start seeding...')

  console.log('Seeding muscle groups')
  await prisma.muscleGroup.createMany({
    data: muscleGroups
  })

  console.log('Seeding equipments')
  await prisma.equipment.createMany({
    data: equipments
  })

  console.log('Seeding movements')
  for(const movement of movements){
    await prisma.movement.create({
      data: movement
    })
  }

  console.log('Seeding exercise techniques')
  await prisma.exerciseTechnique.createMany({
    data: exerciseTechniques
  })

  console.log('Seeding training planning types')
  await prisma.trainingPlanningType.createMany({
    data: trainingPlanningTypes
  })

  console.log('Seeding exercises')
  for(const exercise of exercises){
    await prisma.exercise.create({
      data: exercise
    })
  }

  console.log('Seeding trainings')
  for(const training of trainings){
    await prisma.training.create({
      data: training
    })
  }


  console.log('Seeding training plannings')
  for(const trainingPlanning of trainingPlannings){
    await prisma.trainingPlanning.create({
      data: trainingPlanning
    })
  }

  console.log('Seeding users')
  for(const user of users){
    await prisma.user.create({
      data: user
    })
  }

  
}

main();