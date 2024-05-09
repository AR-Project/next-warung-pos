import {
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
  boolean,
} from "drizzle-orm/pg-core";
import { storeMenuCategories } from "./categories";

export const storeMenu = pgTable("stores_menu", {
  id: text("id").primaryKey().unique(),
  categoryId: text("category_id").references(() => storeMenuCategories.id),
  name: text("name").notNull(),
  createdAt: timestamp("created_at", { mode: "string", withTimezone: true })
    .defaultNow()
    .notNull(),
  modifiedAt: timestamp("modified_at", { mode: "string", withTimezone: true })
    .defaultNow()
    .notNull(),
  isAvailable: boolean("is_available").default(false).notNull(),
  isDeleted: boolean("is_deleted").default(false).notNull(),
});
