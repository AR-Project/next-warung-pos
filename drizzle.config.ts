import type { Config } from "drizzle-kit";

export default {
  schema: "./src/infrastructure/database/schema/*",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    host: "127.0.0.2",
    port: 5432,
    database: "nextpos",
    user: "developer",
    password: "dev",
  },
} satisfies Config;
