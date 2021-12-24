import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import { PrismaClient } from '@prisma/client'

export default NextAuth({
  providers: [
    // Auth0Provider({
    //   clientId: process.env.AUTH0_CLIENT_ID || '',
    //   clientSecret: process.env.AUTH0_CLIENT_SECRET || '',
    //   issuer: process.env.AUTH0_ISSUER 
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
    })
  ],
  secret: process.env.JWT_SECRET,
  callbacks: {
    async signIn ({ user }) {
      const prisma = new PrismaClient();

      const student = await prisma.student.findFirst({
        where: {
          email: user.email || ''
        }
      })

      if(!student) {
        await prisma.student.create({
          data: {
            email: user.email || '',
            name: user.name || '',
            profile: user.image || '',
          }
        })
      }

      return true;
    }
  }
})