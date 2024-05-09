import { injectable, inject } from "tsyringe";

import { type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { eq, or } from "drizzle-orm";

import type IIdGenerator from "@/Application/tools/IdGenerator";
import type IStoreRepository from "@/Domains/stores/IStoreRepository";

import { stores } from "../database/schema/stores";
import NotFoundError from "@/Commons/exceptions/NotFoundError";

@injectable()
export default class StoreRepository implements IStoreRepository {
  _db: PostgresJsDatabase<Record<string, never>>;
  _idGenerator: IIdGenerator;

  constructor(
    @inject("db") db: PostgresJsDatabase<Record<string, never>>,
    @inject("idGenerator") idGenerator: IIdGenerator
  ) {
    this._db = db;
    this._idGenerator = idGenerator;
  }

  async addStore(payload: IAddStore) {
    const addStore = await this._db
      .insert(stores)
      .values({ id: `${this._idGenerator.generate(8)}`, ...payload })
      .returning({ id: stores.id });

    return addStore[0].id;
  }

  async verifyStoreId(payload: StoreId) {
    const store = await this._db
      .select()
      .from(stores)
      .where(eq(stores.id, payload));

    if (store.length !== 1) {
      throw new NotFoundError("storeId not valid");
    }
  }

  async getStoreInfo(storeId: string) {
    const storeInfo = await this._db
      .select()
      .from(stores)
      .where(eq(stores.id, storeId));

    if (storeInfo.length !== 1) {
      throw new NotFoundError("Store Not Found");
    }

    return storeInfo[0];
  }

  async getStoresByUserId(userId: string) {
    const storeInfo = await this._db
      .select()
      .from(stores)
      .where(eq(stores.ownerId, userId));

    return storeInfo;
  }
}
