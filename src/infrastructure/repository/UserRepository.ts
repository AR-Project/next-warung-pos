import { injectable, inject } from "tsyringe";

import { type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { eq, or } from "drizzle-orm";

import type IIdGenerator from "@/Application/tools/IdGenerator";
import IUserRepository from "@/Domains/users/IUserRepository";
import InvariantError from "@/Commons/exceptions/InvariantError";

import { user } from "../database/schema/user";
import { IRegisterUser } from "@/Domains/users/entities/RegisterUser";
import RegisteredUser from "@/Domains/users/entities/RegisteredUser";

@injectable()
export default class UserRepository implements IUserRepository {
  _db: PostgresJsDatabase<Record<string, never>>;
  _idGenerator: IIdGenerator;

  constructor(
    @inject("db") db: PostgresJsDatabase<Record<string, never>>,
    @inject("idGenerator") idGenerator: IIdGenerator
  ) {
    this._db = db;
    this._idGenerator = idGenerator;
  }
  verifyUserExist = async (username: string, email: string) => {
    const selectedUser = await this._db
      .select()
      .from(user)
      .where(or(eq(user.username, username), eq(user.email, email)));

    if (selectedUser.length !== 0) {
      throw new InvariantError("username / email sudah terpakai");
    }
  };
  async verifyAvailableUsername(username: string) {
    const selectedUser = await this._db
      .select()
      .from(user)
      .where(eq(user.username, username));

    if (selectedUser.length !== 0) {
      throw new InvariantError("username tidak tersedia");
    }
  }

  async addUser(registerUser: IRegisterUser) {
    const addUser = await this._db
      .insert(user)
      .values({ id: `user-${this._idGenerator.generate()}`, ...registerUser })
      .returning({
        id: user.id,
        username: user.username,
        fullName: user.fullName,
        role: user.role,
      });

    return new RegisteredUser(addUser[0]);
  }
  async getPasswordByUsername(username: string) {
    const userInfo = await this._db
      .select({ savedPassword: user.password })
      .from(user)
      .where(eq(user.username, username));

    if (userInfo.length === 0) {
      throw new InvariantError("username not found");
    }

    const { savedPassword } = userInfo[0];
    return savedPassword;
  }

  async getUserInfoByUsername(username: string) {
    const userInfo = await this._db
      .select({
        id: user.id,
        password: user.password,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        username: user.username,
      })
      .from(user)
      .where(eq(user.username, username));

    if (userInfo.length === 0) {
      throw new InvariantError("username not found");
    }

    return userInfo[0];
  }

  async updatePassword(id: string, newPassword: string) {
    await this._db
      .update(user)
      .set({ password: newPassword })
      .where(eq(user.id, id));
  }
  // getCoreInfoByUsername: (username: string) => Promise<IUserCoreInfo>;
}
