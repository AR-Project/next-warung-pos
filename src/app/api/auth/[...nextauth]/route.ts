import "reflect-metadata";

import NextAuth from "next-auth";
import { authOptionsFactory } from "./authOptions";

import container from "@/infrastructure/container";

const handler = NextAuth(authOptionsFactory(container));

export { handler as GET, handler as POST };
