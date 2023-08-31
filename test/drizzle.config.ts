import "dotenv/config";
import type { Config } from "drizzle-kit";

export default {
  schema: "./src/infrastructure/database/schema/*",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    host: process.env.PGHOST_TEST as string,
    port: process.env.PGPORT_TEST as unknown as number,
    database: process.env.PGDATABASE_TEST as string,
    user: process.env.PGUSER_TEST as string,
    password: process.env.PGPASSWORD_TEST as string,
  },
} satisfies Config;
