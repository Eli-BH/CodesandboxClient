import NextAuth, { NextAuthOptions } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import Caregiver from "../../../models/CaregiverModel";
import Patient from "../../../models/PatientModel";
import dbConnect from "../../../utils/connectMongo";
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
          const res = await axios.post(`https://fc-iss-server.herokuapp.com:${process.env.PORT}/api/auth/login`, {
            email,
            password,
          });

          console.log(res)

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
};

export default NextAuth(authOptions);
