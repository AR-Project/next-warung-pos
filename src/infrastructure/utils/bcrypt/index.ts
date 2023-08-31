import bcrypt from "bcrypt";

import IPasswordHash from "@/Application/security/PasswordHash";
import AuthenticationError from "@/Commons/exceptions/AuthenticationError";

export default class PasswordHashImplementation implements IPasswordHash {
  async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async comparePassword(
    password: string,
    hashedPassword: string
  ): Promise<void> {
    const result = await bcrypt.compare(password, hashedPassword);
    if (!result) {
      throw new AuthenticationError(
        "kredensial yang Anda masukkan salah"
      ) as Error;
    }
  }
}
