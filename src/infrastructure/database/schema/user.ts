import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const user = pgTable("users", {
  id: text("id").primaryKey().unique(),
  fullName: text("full_name"),
  email: text("email"),
  role: varchar("role", { length: 10 }),
  password: text("password"),
});
