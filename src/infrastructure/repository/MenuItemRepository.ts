import { injectable, inject } from "tsyringe";
import { type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { eq, or, count, asc, SQL, sql, inArray, and } from "drizzle-orm";

import type IIdGenerator from "@/Application/tools/IdGenerator";

import InvariantError from "@/Commons/exceptions/InvariantError";
import NotFoundError from "@/Commons/exceptions/NotFoundError";

import { IMenuCategoriesRepository } from "@/Domains/menuCategory/IMenuCategoryRepository";
import { IMenuItemsRepository } from "@/Domains/menuItem/IMenuItemRepository";

import { storeMenuCategories } from "../database/schema/categories";
import { storeMenuItem } from "../database/schema/menuItem";

@injectable()
export default class MenuItemRepository implements IMenuItemsRepository {
  _db: PostgresJsDatabase<Record<string, never>>;
  _idGenerator: IIdGenerator;

  constructor(
    @inject("db") db: PostgresJsDatabase<Record<string, never>>,
    @inject("idGenerator") idGenerator: IIdGenerator
  ) {
    this._db = db;
    this._idGenerator = idGenerator;
  }

  async countByCategoryId(payload: string) {
    const totalCount = await this._db
      .select({ count: count() })
      .from(storeMenuItem)
      .where(
        and(
          eq(storeMenuItem.categoryId, payload),
          eq(storeMenuItem.isDeleted, false)
        )
      );
    return totalCount[0].count;
  }

  async add(payload: Required<IAddMenuItemPayload>) {
    const itemsCount = await this.countByCategoryId(payload.categoryId);

    const items = await this._db
      .insert(storeMenuItem)
      .values({
        id: `item-${this._idGenerator.generate(10)}`,
        sortOrder: itemsCount,
        ...payload,
      })
      .returning({ id: storeMenuItem.id });

    //   Promise<string>;
    return items[0].id;
  }
  // getById: (payload: string) => Promise<IMenuItemInfo>;
  async getById(id: string) {
    const items = await this._db
      .select()
      .from(storeMenuItem)
      .where(and(eq(storeMenuItem.id, id), eq(storeMenuItem.isDeleted, false)));
    if (items.length === 0) {
      throw new NotFoundError("Item tidak ditemukan");
    }
    return items[0];
  }
  // getByCategoryId: (payload: string) => Promise<IMenuItemInfo[]>;
  async getByCategoryId(categoryId: string) {
    const items = await this._db
      .select()
      .from(storeMenuItem)
      .where(
        and(
          eq(storeMenuItem.categoryId, categoryId),
          eq(storeMenuItem.isDeleted, false)
        )
      )
      .orderBy(storeMenuItem.sortOrder);
    return items;
  }

  async getByCategoryIds(ids: CategoryId[]) {
    const items = await this._db
      .select()
      .from(storeMenuItem)
      .where(
        and(
          inArray(storeMenuItem.categoryId, ids),
          eq(storeMenuItem.isDeleted, false)
        )
      )
      .orderBy(storeMenuItem.sortOrder);
    return items;

    // Promise<IMenuItemRow[]>
  }

  // updateSortOrder: (payload: IUpdateSortOrder[]) => Promise<void>;
  async updateSortOrder(payload: IUpdateSortOrder[]) {
    if (payload.length === 0) {
      throw new InvariantError("Update payload not valid");
    }

    const sqlChunks: SQL[] = []; // Placeholder for 'custom' sql in shape of array
    const ids: string[] = []; // Placeholder for category id in shape of array

    sqlChunks.push(sql`(case`); // Begin 'custom' sql array / sqlChunks[0]

    for (const row of payload) {
      sqlChunks.push(
        sql`when ${storeMenuItem.id} = ${row.id} then ${row.sortOrder}::INTEGER`
      );
      ids.push(row.id);
    }

    sqlChunks.push(sql`end)`); // push final closing for 'custom' sql array, sqlChunks[n]

    const finalSql: SQL = sql.join(sqlChunks, sql.raw(" "));

    await this._db
      .update(storeMenuItem)
      .set({ sortOrder: finalSql })
      .where(inArray(storeMenuItem.id, ids)); // https://orm.drizzle.team/docs/operators#inarray
  }
  // update: (payload: IUpdateMenuItem) => Promise<IMenuItemInfo>;
  async update(payload: IUpdateMenuItem) {
    const updatedItem = await this._db
      .update(storeMenuItem)
      .set(payload)
      .where(eq(storeMenuItem.id, payload.id))
      .returning();

    return updatedItem[0];
  }

  // delete: (payload: string) => Promise<void>;
  async delete(id: string) {
    await this._db
      .update(storeMenuItem)
      .set({ isDeleted: true })
      .where(eq(storeMenuItem.id, id));
  }
}
