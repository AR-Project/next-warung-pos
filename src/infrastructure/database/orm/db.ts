import { drizzle } from "drizzle-orm/postgres-js";
import pgDb from "../postgres";

const db = drizzle(pgDb);

export default db;
