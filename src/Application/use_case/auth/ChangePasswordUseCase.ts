import { inject, injectable } from "tsyringe";

import type IPasswordHash from "@/Application/security/PasswordHash";
import type IUserRepository from "@/Domains/users/IUserRepository";
import type ILogRepository from "@/Domains/logs/ILogRepository";

@injectable()
export default class ChangeUserPassword {
  _userRepository: IUserRepository;
  _passwordHash: IPasswordHash;
  _logRepository: ILogRepository;

  constructor(
    @inject("IUserRepository")
    userRepository: IUserRepository,
    @inject("ILogRepository") logRepository: ILogRepository,
    @inject("IPasswordHash")
    passwordHash: IPasswordHash
  ) {
    this._userRepository = userRepository;
    this._logRepository = logRepository;
    this._passwordHash = passwordHash;
  }

  async execute(payload: ChangeUserPasswordPayload) {
    const { userId, password, newPassword } = payload;
    const userPassword = await this._userRepository.getPasswordById(userId);
    await this._passwordHash.comparePassword(password, userPassword);
    const hasedNewPassword = await this._passwordHash.hash(newPassword);
    await this._userRepository.updatePassword(userId, hasedNewPassword);
    await this._logRepository.log({
      userId,
      targetId: userId,
      task: "change password",
    });
  }
}
