import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
} from "drizzle-orm/pg-core";
import { storeMenuCategories } from "./categories";
import { user } from "./user";
import { stores } from "./stores";

export const storeMenuItem = pgTable("stores_menu_item", {
  id: text("id").primaryKey().unique(),
  userId: text("user_id")
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),
  categoryId: text("category_id")
    .references(() => storeMenuCategories.id)
    .notNull(),
  storeId: text("store_id")
    .references(() => stores.id, {
      onDelete: "cascade",
    })
    .notNull(),
  name: text("name").notNull(),
  imageUrl: text("image_url"),
  color: text("color").notNull(),
  price: integer("price").notNull(),
  sortOrder: integer("order").notNull(),
  isAvailable: boolean("is_available").default(false).notNull(),
  isDeleted: boolean("is_deleted").default(false).notNull(),
  createdAt: timestamp("created_at", { mode: "string", withTimezone: true })
    .defaultNow()
    .notNull(),
  modifiedAt: timestamp("modified_at", { mode: "string", withTimezone: true })
    .defaultNow()
    .notNull(),
});
