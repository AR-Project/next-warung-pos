import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";

type UserId = string;

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
  }
}

declare module "next-auth" {
  interface User {
    role: string;
  }

  interface Session {
    user: User & {
      id: string;
      name: string;
      role: string;
    };
  }
}
