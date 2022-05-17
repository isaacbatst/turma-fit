import { PrismaClient } from "@prisma/client";

async function main(){
  const prisma = new PrismaClient();

  try {
    console.log('seeding is bypassed...');
    // await seedAll(prisma);

  } catch (err) {
    console.error(err)
  }

  await prisma.$disconnect();
}

// async function seedAll(prisma: PrismaClient){
  
// }

main();