import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Caregiver from "../../../models/CaregiverModel";
import Patient from "../../../models/PatientModel";
import dbConnect from "../../../utils/connectMongo";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        dbConnect();

        const user =
          (await Patient.findOne({ email: email })) ||
          (await Caregiver.findOne({ email: email }));

        if (!user) {
          throw new Error("No user found!");
        }

        //login logic
        // find user in db

        if (email !== "test@test.com" || password !== "password") {
          throw new Error(`Invalid credentials`);
        }

        //passes validation
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
};

export default NextAuth(authOptions);
