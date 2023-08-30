import postgres from "postgres";

const db = postgres({ max: 2 });

export default db;
