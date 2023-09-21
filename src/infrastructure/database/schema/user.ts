import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const user = pgTable("users", {
  id: text("id").primaryKey().unique(),
  username: text("username").unique().notNull(),
  fullName: text("full_name").notNull(),
  email: text("email").unique().notNull(),
  role: varchar("role", { length: 10 }).notNull(),
  password: text("password").notNull(),
  parentId: text("parent_id"),
  createdAt: timestamp("created_at").defaultNow(),
  lastModifiedAt: timestamp("last_modified_at").defaultNow(),
});
