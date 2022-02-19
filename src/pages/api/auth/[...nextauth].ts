import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import EmailProvider from 'next-auth/providers/email';
import { prisma } from "../../../lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { getSession } from "next-auth/react";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt'
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD
        }
      },
      from: process.env.EMAIL_FROM, 
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
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
          },
          student: {
            select: {
              id: true
            }
          }
        }
      })

      console.log('name on session callb', user?.name)

      session.user.isPersonal = !!user?.personal;
      session.user.isStudent = !!user?.student;
      session.user.name = user?.name ?? undefined;

      return session;
    }
  }
})