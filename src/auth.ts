import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { User } from "./models/user";
import { connectDB } from "./lib/connectDB";
import { config } from "./config/config";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: config.GithubAuthID,
      clientSecret: config.GithubAuthSecret,
    }),
    Google({
      clientId: config.GoogleAuthID,
      clientSecret: config.GoogleAuthSecret,
    }),
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
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (token?.sub && token?.role) {
        session.user.id = token.sub;
        session.user.role = token.role;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    signIn: async ({ user, account }) => {
      if (account?.provider === "google") {
        try {
          const { email, image, name, id } = user;
          connectDB(config.MONGOURI!);
          const existingUser = await User.findOne({ email });
          if (!existingUser) {
            await User.create({
              email,
              image,
              firstName: name,
              lastName: name,
              authProviderId: id,
            });
          } else {
            return true;
          }
        } catch (error) {
          throw new Error("Error while creating user");
        }
      }

      if (account?.provider === "credentials") {
        return true;
      } else {
        return false;
      }
    },
  },
});
