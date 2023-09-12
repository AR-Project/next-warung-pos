import type IPasswordHash from "@/Application/security/PasswordHash";
import type IUserRepository from "@/Domains/users/IUserRepository";
import UserLogin, { IUserlogin } from "@/Domains/users/entities/UserLogin";
import { inject, injectable } from "tsyringe";

@injectable()
export default class VerifyUserCredentials {
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

  async execute(useCasePayload: IUserlogin): Promise<UserInfo> {
    const { username, password: payloadPassword } = new UserLogin(
      useCasePayload
    );

    const { password: userPassword, ...userInfo } =
      await this._userRepository.getUserInfoByUsername(username);

    await this._passwordHash.comparePassword(payloadPassword, userPassword);

    return userInfo as UserInfo;
  }
}
