import { inject, injectable } from "tsyringe";

import type IPasswordHash from "@/Application/security/PasswordHash";
import type IUserRepository from "@/Domains/users/IUserRepository";

@injectable()
export default class ChangeUserPassword {
  _userRepository: IUserRepository;
  _passwordHash: IPasswordHash;

  constructor(
    @inject("IUserRepository")
    userRepository: IUserRepository,
    @inject("IPasswordHash")
    passwordHash: IPasswordHash
  ) {
    this._userRepository = userRepository;
    this._passwordHash = passwordHash;
  }

  async execute(payload: ChangeUserPasswordPayload) {
    const { userId, password, newPassword } = payload;
    const userPassword = await this._userRepository.getPasswordById(userId);
    await this._passwordHash.comparePassword(password, userPassword);
    const hasedNewPassword = await this._passwordHash.hash(newPassword);
    await this._userRepository.updatePassword(userId, hasedNewPassword);
  }
}
