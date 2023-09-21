import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

import { user } from "./user";

export const activity = pgTable("logs", {
  id: text("id").primaryKey().unique(),
  timestamp: timestamp("timestamp").defaultNow(),
  userId: text("user_id").references(() => user.id),
  storeId: text("store_id"),
  targetId: text("target_id"),
  message: text("message"),
});
