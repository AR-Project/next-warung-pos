import type IPasswordHash from "@/Application/security/PasswordHash";
import type ILogRepository from "@/Domains/logs/ILogRepository";
import type IUserRepository from "@/Domains/users/IUserRepository";
import UserLogin, { IUserlogin } from "@/Domains/users/entities/UserLogin";
import { inject, injectable } from "tsyringe";

@injectable()
export default class VerifyUserCredentials {
  _userRepository: IUserRepository;
  _logRepository: ILogRepository;
  _passwordHash: IPasswordHash;

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

  async execute(useCasePayload: IUserlogin): Promise<UserInfo> {
    const { username, password: payloadPassword } = new UserLogin(
      useCasePayload
    );

    const { password: userPassword, ...userInfo } =
      await this._userRepository.getUserInfoByUsername(username);

    await this._passwordHash.comparePassword(payloadPassword, userPassword);

    await this._logRepository.log({
      userId: userInfo.id,
      task: "user login",
    });

    return userInfo as UserInfo;
  }
}
