import { eq } from "drizzle-orm";

import db from "@/infrastructure/database/orm/db";
import { storeMenuItem } from "@/infrastructure/database/schema/menuItem";

export const storeMenuItemTableHelper = {
  add: async ({
    id = "item-000",
    userId = "user-123",
    storeId = "store-123",
    categoryId = "cat-001",
    name = "Test Item #1",
    color = "#000000",
    price = 0,
    sortOrder = 0,
    createdAt = new Date("1 Jan 2000").toISOString(),
    modifiedAt = new Date("1 Jan 2000").toISOString(),
    isAvailable = true,
    isDeleted = false,
  }: Partial<IMenuItemRow>): Promise<void> => {
    await db.insert(storeMenuItem).values({
      id,
      userId,
      categoryId,
      storeId,
      name,
      color,
      price,
      sortOrder,
      createdAt,
      modifiedAt,
      isAvailable,
      isDeleted,
    });
  },

  findById: async (itemId: string) => {
    const items = await db
      .select()
      .from(storeMenuItem)
      .where(eq(storeMenuItem.id, itemId));

    return items[0];
  },

  cleanTable: async () => await db.delete(storeMenuItem),
};
