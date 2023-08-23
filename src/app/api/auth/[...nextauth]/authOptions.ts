import CredentialsProvider from "next-auth/providers/credentials";
import { type AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "username", type: "text", placeholder: "Username" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = [
          { id: "user-1", name: "admin", password: "pass", role: "ADMIN" },
          { id: "user-2", name: "user", password: "pass", role: "USER" },
        ];

        const userIndex = user.findIndex(
          (e) => e.name === credentials?.username
        );

        if (userIndex === -1) return null;
        if (user[userIndex].password === credentials?.password) {
          return user[userIndex];
        }
        return null;
      },
    }),
  ],
  secret: process.env.SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ token, session }) {
      if (token !== undefined && session !== null) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
};
