import { NextApiHandler } from 'next';
import NextAuth, { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

import prisma from '../../../core/prisma';
import { authUserByToken } from '../../../features/users/services/authUserByToken';
import { getUserById } from '../../../features/users/repository';

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    CredentialsProvider({
      id: 'telegram-bot-token',
      name: 'Auth with token from Telegram Bot',
      async authorize(credentials) {
        if (!credentials?.token) {
          return null;
        }

        const authResponse = await authUserByToken({ token: credentials.token });

        if (authResponse.status === 'notFound') {
          return null;
        }

        return authResponse.user;
      },
      credentials: {
        token: { label: 'Bot token' },
      },
    }),
  ],
  session: { strategy: 'jwt' },
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.uid as string;
        if (token.uid) {
          const user = await getUserById(token.uid as string);
          session.user.name = user?.name;
        }
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
};

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);

export default authHandler;
