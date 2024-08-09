import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { User } from "./models/user";
import { connectDB } from "./lib/connectDB";
import { config } from "./config/config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (
        credentials
      ): Promise<{
        firstName: string;
        lastName: string;
        email: string;
        role: string;
        id: string;
      }> => {
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;
        if (!email || !password) {
          throw new CredentialsSignin("All fields are required");
        }

        connectDB(config.MONGOURI!);

        const user = await User.findOne({ email }, "+password +role");
        if (!user) {
          throw new Error("User not found");
        }

        const isValidPassword = bcrypt.compareSync(password, user.password);

        if (!isValidPassword) {
          throw new Error("Invalid email or password");
        }

        const userData = {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          id: user._id.toString(),
        };

        return userData;
      },
    }),
  ],
});
