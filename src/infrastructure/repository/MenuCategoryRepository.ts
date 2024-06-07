import { injectable, inject } from "tsyringe";

import { type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { eq, or, count, asc, SQL, sql, inArray, and } from "drizzle-orm";

import type IIdGenerator from "@/Application/tools/IdGenerator";

import InvariantError from "@/Commons/exceptions/InvariantError";

import { storeMenuCategories } from "../database/schema/categories";
import NotFoundError from "@/Commons/exceptions/NotFoundError";
import { IMenuCategoriesRepository } from "@/Domains/menuCategory/IMenuCategoryRepository";

@injectable()
export default class MenuCategoryRepository
  implements IMenuCategoriesRepository
{
  _db: PostgresJsDatabase<Record<string, never>>;
  _idGenerator: IIdGenerator;

  constructor(
    @inject("db") db: PostgresJsDatabase<Record<string, never>>,
    @inject("idGenerator") idGenerator: IIdGenerator
  ) {
    this._db = db;
    this._idGenerator = idGenerator;
  }

  async getCategoriesCountByStoreId(storeId: StoreId) {
    const total = await this._db
      .select({ count: count() })
      .from(storeMenuCategories)
      .where(eq(storeMenuCategories.storeId, storeId));

    return total[0].count;
  }

  async addMenuCategory(payload: Required<IAddMenuCategory>) {
    const categoriesCount = await this.getCategoriesCountByStoreId(
      payload.storeId
    );

    const category = await this._db
      .insert(storeMenuCategories)
      .values({
        id: `cat-${this._idGenerator.generate(10)}`,
        userId: payload.ownerId,
        sortOrder: categoriesCount,
        ...payload,
      })
      .returning({ id: storeMenuCategories.id });

    return category[0].id;
  }

  async getMenuCategoryInfo(payload: string, withDeleted = false) {
    const category = await this._db
      .select()
      .from(storeMenuCategories)
      .where(
        and(
          eq(storeMenuCategories.id, payload),
          eq(storeMenuCategories.isDeleted, withDeleted)
        )
      );

    if (category.length !== 1) {
      throw new NotFoundError("categoryId not valid");
    }

    return category[0];
  }

  async getAllCategoriesIdsByStoreId(storeId: string) {
    const categoryIDs = await this._db
      .select({
        id: storeMenuCategories.id,
      })
      .from(storeMenuCategories)
      .where(
        and(
          eq(storeMenuCategories.storeId, storeId),
          eq(storeMenuCategories.isDeleted, false)
        )
      )
      .orderBy(asc(storeMenuCategories.sortOrder));

    return categoryIDs.map((obj) => obj.id);
  }

  async getAllInfoByStoreId(storeId: StoreId) {
    return await this._db
      .select()
      .from(storeMenuCategories)
      .where(
        and(
          eq(storeMenuCategories.storeId, storeId),
          eq(storeMenuCategories.isDeleted, false)
        )
      )
      .orderBy(asc(storeMenuCategories.sortOrder));
  }

  async updateMenuCategory(payload: IUpdateMenuCategory) {
    const finalPayload: Partial<IMenuCategoryInfo> = {
      userId: payload.ownerId,
      storeId: payload.storeId,
      name: payload.name,
      color: payload.color,
      modifiedAt: new Date().toISOString(),
    };

    const updatedCategory = await this._db
      .update(storeMenuCategories)
      .set(finalPayload)
      .where(eq(storeMenuCategories.id, payload.id))
      .returning();

    return updatedCategory[0];
  }

  async updateCategorySortOrder(payload: IUpdateMenuCategorySortOrder[]) {
    if (payload.length === 0) {
      throw new InvariantError("Update payload not valid");
    }

    const sqlChunks: SQL[] = []; // Placeholder for 'custom' sql in shape of array
    const ids: string[] = []; // Placeholder for category id in shape of array

    sqlChunks.push(sql`(case`); // Begin 'custom' sql array / sqlChunks[0]

    for (const row of payload) {
      sqlChunks.push(
        sql`when ${storeMenuCategories.id} = ${row.id} then ${row.sortOrder}::INTEGER`
      );

      ids.push(row.id);
    }

    sqlChunks.push(sql`end)`); // push final closing for 'custom' sql array, sqlChunks[n]

    // join 'custom' sql array into single string
    const finalSql: SQL = sql.join(sqlChunks, sql.raw(" "));

    await this._db
      .update(storeMenuCategories)
      .set({ sortOrder: finalSql })
      .where(inArray(storeMenuCategories.id, ids)); // https://orm.drizzle.team/docs/operators#inarray
  }

  async deleteMenuCategory(payload: string) {
    await this._db
      .update(storeMenuCategories)
      .set({
        isDeleted: true,
        sortOrder: 99999,
        modifiedAt: new Date().toISOString(),
      })
      .where(eq(storeMenuCategories.id, payload));
  }
}
