import postgres from "postgres";

const pgDb =
  process.env.NODE_ENV === "test"
    ? postgres({
        host: process.env.PGHOST_TEST as string,
        port: process.env.PGPORT_TEST as unknown as number,
        database: process.env.PGDATABASE_TEST as string,
        username: process.env.PGUSER_TEST as string,
        password: process.env.PGPASSWORD_TEST as string,
      })
    : postgres({ max: 2 });

export default pgDb;
