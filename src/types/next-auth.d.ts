import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";

type UserId = string;
type ActiveStore = string;

declare module "next-auth/jwt" {
  interface JWT extends UserInfo {
    activeStore?: string;
  }
}

declare module "next-auth" {
  interface User extends UserInfo {
    activeStore?: string;
  }

  interface Session {
    user: UserInfo & {
      name: string;
      activeStore?: string;
    };
  }
}
