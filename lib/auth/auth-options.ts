import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { getDefaultCurrentUser } from '@/lib/db/current-user';
import { ensureGoogleUserByName } from './google-user';

const googleEnabled =
  Boolean(process.env.GOOGLE_CLIENT_ID) &&
  Boolean(process.env.GOOGLE_CLIENT_SECRET) &&
  Boolean(process.env.NEXTAUTH_SECRET);

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Демо-користувач',
      credentials: {},
      async authorize() {
        const user = await getDefaultCurrentUser();

        if (!user) {
          return null;
        }

        return {
          id: user.id,
          name: user.fullName,
          authMode: 'demo',
        };
      },
    }),
    ...(googleEnabled
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
          }),
        ]
      : []),
  ],
  callbacks: {
    async signIn({ account, profile, user }) {
      if (account?.provider !== 'google') {
        return true;
      }

      const fullName = profile?.name ?? user.name;

      if (!fullName) {
        return false;
      }

      await ensureGoogleUserByName(fullName);
      return true;
    },
    async jwt({ token, account, user, profile }) {
      if (account?.provider === 'credentials' && user) {
        token.appUserId = user.id;
        token.fullName = user.name ?? null;
        token.authMode = 'demo';
      }

      if (account?.provider === 'google') {
        const fullName = profile?.name ?? user?.name ?? token.name;

        if (fullName) {
          const appUser = await ensureGoogleUserByName(fullName);
          token.appUserId = appUser.id;
          token.fullName = appUser.fullName;
          token.authMode = 'google';
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id =
          typeof token.appUserId === 'string' ? token.appUserId : '';
        session.user.fullName =
          typeof token.fullName === 'string'
            ? token.fullName
            : session.user.name ?? '';
        session.user.authMode = token.authMode === 'google' ? 'google' : 'demo';
      }

      return session;
    },
  },
};

export function isGoogleAuthEnabled() {
  return googleEnabled;
}
