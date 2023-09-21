import ILogsRepository from "@/Domains/logs/ILogRepository";
import type IIdGenerator from "@/Application/tools/IdGenerator";

import { type PostgresJsDatabase } from "drizzle-orm/postgres-js";

import { injectable, inject } from "tsyringe";
import { activity } from "../database/schema/log";

@injectable()
export default class LogsRepository implements ILogsRepository {
  _db: PostgresJsDatabase<Record<string, never>>;
  _idGenerator: IIdGenerator;

  constructor(
    @inject("db") db: PostgresJsDatabase<Record<string, never>>,
    @inject("idGenerator") idGenerator: IIdGenerator
  ) {
    this._db = db;
    this._idGenerator = idGenerator;
  }
  async log(payload: ActivityLog) {
    await this._db.insert(activity).values({
      id: `activity-${this._idGenerator.generate()}`,
      ...payload,
    });
  }
}
