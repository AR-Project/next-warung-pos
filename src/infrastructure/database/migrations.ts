import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";

import db from "./postgres";

console.log("start migrating");
migrate(drizzle(db), { migrationsFolder: "./drizzle" })
  .then(() => {
    console.log("Migration Success");
    process.exit(0);
  })
  .catch((error) => {
    console.log("Migration Fail");
    console.log(error.message);

    process.exit(1);
  });
