import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import { prisma } from "../../../lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter"

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
    })
  ],
  secret: process.env.JWT_SECRET,
  callbacks: {
    async session ({ session }) {
      const user = await prisma.user.findUnique({
        where: {
          email: session.user.email || ''
        },
        include: {
          personal: {
            select: {
              id: true
            }
          }
        }
      })

      session.user.personal = !!user?.personal;

      return session;
    }
  }
})