import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { db } from './lib/db';
import { authorizedUsers } from './lib/db/schema';
import { eq } from 'drizzle-orm';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;
      // Únicamente cristborrero@gmail.com tiene acceso al panel
      return user.email === 'cristborrero@gmail.com';
    },
    authorized({ auth: session, request }) {
      const { pathname } = request.nextUrl;
      // La página de login siempre es accesible, sin importar la sesión
      if (pathname === '/admin/login') return true;
      // El resto de /admin requiere sesión activa
      if (pathname.startsWith('/admin')) {
        return !!session?.user;
      }
      return true;
    },
  },
});
