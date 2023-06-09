import NextAuth, { NextAuthOptions } from 'next-auth';
import Auth0Provider from 'next-auth/providers/auth0';

export const authOptions: NextAuthOptions = {
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_ID,
      clientSecret: process.env.AUTH0_SECRET,
      issuer: 'https://pgl-intern.eu.auth0.com'
    })
  ],
  callbacks: {
    async jwt({ token }) {
      token.userRole = 'admin';
      return token;
    }
  }
};

export default NextAuth(authOptions);
