import { Config, defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/infrastructure/database/schema/*",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL_TEST as string,
  },
});
