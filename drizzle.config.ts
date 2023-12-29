import "dotenv/config";
import type { Config } from "drizzle-kit";

export default {
  schema: "./src/infrastructure/database/schema/*",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    host: process.env.PGHOST as string,
    port: process.env.PGPORT as unknown as number,
    database: process.env.PGDATABASE as string,
    user: process.env.USER as string,
    password: process.env.PGPASSWORD as string,
  },
} satisfies Config;
