import IIdGenerator from "@/Application/tools/IdGenerator";
import { nanoid } from "nanoid";

class NanoIdInfrastructure implements IIdGenerator {
  _generator: () => string;

  constructor(nanoid: () => string) {
    this._generator = nanoid;
  }

  generate(): string {
    return this._generator();
  }
}

const singleton = new NanoIdInfrastructure(nanoid);

Object.freeze(singleton);

export default singleton;
