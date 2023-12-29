import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { user } from "./user";

export const stores = pgTable("stores", {
  id: text("id").primaryKey().unique(),
  name: text("name").notNull(),
  ownerId: text("owner_id").references(() => user.id),
  createdAt: timestamp("created_at").defaultNow(),
  modifiedAt: timestamp("modified_at").defaultNow(),
});
