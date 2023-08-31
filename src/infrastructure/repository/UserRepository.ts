import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { eq } from "drizzle-orm";

import type postgres from "postgres";

import IIdGenerator from "@/Application/tools/IdGenerator";
import IUserRepository from "@/Domains/users/UserRepository";
import { IRegisterUser } from "@/Domains/users/entities/RegisterUser";
import { IRegisteredUser } from "@/Domains/users/entities/RegisteredUser";
import { IUserCoreInfo } from "@/Domains/users/entities/UserCoreInfo";
import InvariantError from "@/Commons/exceptions/InvariantError";

import { user } from "../database/schema/user";

// @ts-expect-error WIP
export default class UserRepository implements IUserRepository {
  _db: PostgresJsDatabase<Record<string, never>>;
  _idGenerator: IIdGenerator;

  constructor(
    db: PostgresJsDatabase<Record<string, never>>,
    idGenerator: IIdGenerator
  ) {
    this._db = db;
    this._idGenerator = idGenerator;
  }
  async verifyAvailableUsername(username: string) {
    const selectedUser = await this._db
      .select()
      .from(user)
      .where(eq(user.username, username));

    if (selectedUser.length !== 0) {
      throw new InvariantError("username tidak tersedia");
    }
  }

  // addUser: (registerUser: IRegisterUser) => Promise<IRegisteredUser>;
  // getPasswordByUsername: (username: string) => Promise<string>;
  // getCoreInfoByUsername: (username: string) => Promise<IUserCoreInfo>;
  // changePassword: (id: string, newPassword: string) => Promise<void>;
}
