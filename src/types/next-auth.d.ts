import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";

type UserId = string;

declare module "next-auth/jwt" {
  interface JWT extends UserInfo {}
}

declare module "next-auth" {
  interface User extends UserInfo {}

  interface Session {
    user: UserInfo & {
      name: string;
    };
  }
}
