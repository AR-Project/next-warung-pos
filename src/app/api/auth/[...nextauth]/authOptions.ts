import CredentialsProvider from "next-auth/providers/credentials";
import { type AuthOptions } from "next-auth";
import { DependencyContainer } from "tsyringe";
import VerifyUserCredentials from "@/Application/use_case/auth/VerifyUserCredentials";

export const authOptionsFactory = (
  container: DependencyContainer
): AuthOptions => {
  return {
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          username: {
            label: "username",
            type: "text",
            placeholder: "Username",
          },
          password: { label: "password", type: "password" },
        },
        async authorize(credentials, req) {
          const verifyUserCredentials = container.resolve(
            VerifyUserCredentials
          );

          try {
            const userInfo = await verifyUserCredentials.execute({
              username: credentials?.username,
              password: credentials?.password,
            });
            return userInfo;
          } catch (error) {
            return null;
          }
        },
      }),
    ],
    secret: process.env.SECRET,
    session: {
      strategy: "jwt",
      maxAge: 60 * 60 * 24 * 30,
    },
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.role = user.role;
          token.id = user.id;
          token.username = user.username;
          token.name = user.fullName;
        }
        return token;
      },
      async session({ token, session }) {
        if (token !== undefined && session !== null) {
          session.user.role = token.role;
          session.user.id = token.id;
          session.user.username = token.username;
          session.user.name = token.name as string;
        }
        return session;
      },
    },
    debug: process.env.NODE_ENV === "development",
    pages: {
      signIn: "/login",
    },
  };
};
