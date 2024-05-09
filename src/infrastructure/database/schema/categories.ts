import {
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
  boolean,
  integer,
} from "drizzle-orm/pg-core";
import { stores } from "./stores";
import { user } from "./user";

export const storeMenuCategories = pgTable("stores_categories", {
  id: text("id").primaryKey().unique(),
  userId: text("user_id")
    .references(() => user.id)
    .notNull(),
  storeId: text("store_id")
    .references(() => stores.id)
    .notNull(),
  name: text("name").notNull(),
  color: text("color").notNull(),
  sortOrder: integer("order").default(0).notNull(),
  createdAt: timestamp("created_at", { mode: "string", withTimezone: true })
    .defaultNow()
    .notNull(),
  modifiedAt: timestamp("modified_at", { mode: "string", withTimezone: true })
    .defaultNow()
    .notNull(),
  isDeleted: boolean("is_deleted").default(false).notNull(),
});
