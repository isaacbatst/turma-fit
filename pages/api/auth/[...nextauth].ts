import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import { prisma } from "../../../lib/prisma";

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
    async signIn ({ user: userFromLogin }) {
      const user = await prisma.user.findUnique({
        where: {
          email: userFromLogin.email || ''
        },
      })

      if(!user) {
        await prisma.user.create({
          data: {
            email: userFromLogin.email || '',
            name: userFromLogin.name || '',
            profile: userFromLogin.image || '',
            student: {
              create: {}
            }
          }
        })
      }

      return true;
    }
  }
})