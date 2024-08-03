import { eq } from "drizzle-orm";

import db from "@/infrastructure/database/orm/db";
import { stores } from "@/infrastructure/database/schema/stores";

export const storeTableTestHelper = {
  async addStore({
    id = "store-123",
    name = "Test Store Name",
    userId = "user-123",
    modifiedAt = new Date("1 Jan 2001").toUTCString(),
    createdAt = new Date("1 Jan 2001").toUTCString(),
  }: Partial<IStoreRow>) {
    await db.insert(stores).values({ id, userId, name, modifiedAt, createdAt });
  },

  async findStoreById(id: string) {
    const result = await db.select().from(stores).where(eq(stores.id, id));

    return result;
  },

  async cleanTable() {
    await db.delete(stores);
  },
};
