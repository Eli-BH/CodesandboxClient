import NextAuth, { NextAuthOptions } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";

import axios from "axios";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},


      //@ts-ignore
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        try {
          const res = await axios.post(`https://mysteps.freedomcare.com/api/auth/login`, {
            email,
            password,
          });

          console.log({ na: res })

          return res.data.user;
        } catch (error: any) {
          throw new Error(error.response.data.message);
        }
      },
    }),

  ],
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET
};

export default NextAuth(authOptions);
