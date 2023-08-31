import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const user = pgTable("users", {
  id: text("id").primaryKey().unique(),
  username: text("username").notNull(),
  fullName: text("full_name").notNull(),
  email: text("email").unique(),
  role: varchar("role", { length: 10 }),
  password: text("password"),
});
