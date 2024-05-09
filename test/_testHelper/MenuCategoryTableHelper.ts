import { eq } from "drizzle-orm";
import db from "@/infrastructure/database/orm/db";
import { storeMenuCategories } from "@/infrastructure/database/schema/categories";

export const storeMenuCategoriesTableHelper = {
  addCategory: async ({
    id = "cat-123",
    userId = "user-123",
    storeId = "store-123",
    name = "Test Category Helper",
    color = "#000000",
    sortOrder = 0,
    createdAt = new Date("1 Jan 2000").toISOString(),
    modifiedAt = new Date("1 Jan 2000").toISOString(),
    isDeleted = false,
  }: Partial<IMenuCategoryInfo>) => {
    await db.insert(storeMenuCategories).values({
      id,
      userId,
      storeId,
      name,
      color,
      sortOrder,
      createdAt,
      modifiedAt,
      isDeleted,
    });
  },

  findById: async (categoryId: string) => {
    const result = await db
      .select()
      .from(storeMenuCategories)
      .where(eq(storeMenuCategories.id, categoryId));

    return result[0];
  },

  cleanTable: async () => {
    await db.delete(storeMenuCategories);
  },
};
