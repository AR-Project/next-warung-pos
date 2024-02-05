import IIdGenerator from "@/Application/tools/IdGenerator";
import { customAlphabet } from "nanoid";

class NanoIdInfrastructure implements IIdGenerator {
  _generator: (size?: number) => string;

  constructor(nanoid: () => string) {
    this._generator = nanoid;
  }

  generate(size?: number): string {
    return this._generator(size);
  }
}

const alphabet = "abcdefghjkmnopqrstuvwxyzABCDEFGHJKMNOPQRSTUVWXYZ";

const singleton = new NanoIdInfrastructure(customAlphabet(alphabet));

Object.freeze(singleton);

export default singleton;
