import {
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
  boolean,
} from "drizzle-orm/pg-core";
import { stores } from "./stores";

export const storeMenuCategories = pgTable("stores_categories", {
  id: text("id").primaryKey().unique(),
  storeId: text("store_id").references(() => stores.id),
  name: text("name").notNull(),
  color: text("color").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  modifiedAt: timestamp("modified_at").defaultNow().notNull(),
  isDeleted: boolean("is_deleted").default(false).notNull(),
});
``;
