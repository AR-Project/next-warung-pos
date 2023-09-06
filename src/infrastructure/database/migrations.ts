import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";

import pgDb from "./postgres";

console.log("start migrating");
(async () => {
  await migrate(drizzle(pgDb), { migrationsFolder: "./drizzle" });
  process.exit(0);
})();
