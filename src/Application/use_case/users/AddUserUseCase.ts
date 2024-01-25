import { injectable, inject } from "tsyringe";
import RegisterUser from "@/Domains/users/entities/RegisterUser";
import { type IRegisteredUser } from "@/Domains/users/entities/RegisteredUser";
import type IUserRepository from "@/Domains/users/IUserRepository";
import type IPasswordHash from "@/Application/security/PasswordHash";
import type IRoleCheck from "@/Application/security/RoleCheck";
import type ILogRepository from "@/Domains/logs/ILogRepository";

export interface IAddUserPayload {
  username: string;
  password: string;
  fullName: string;
  email: string;
  key?: string;
}

@injectable()
export default class AddUserUseCase {
  _userRepository: IUserRepository;
  _logRepository: ILogRepository;
  _passwordHash: IPasswordHash;
  _roleCheck: IRoleCheck;

  constructor(
    @inject("IUserRepository") userRepository: IUserRepository,
    @inject("ILogRepository") logRepository: ILogRepository,
    @inject("IPasswordHash") passwordHash: IPasswordHash,
    @inject("IRoleCheck") roleCheck: IRoleCheck
  ) {
    this._userRepository = userRepository;
    this._logRepository = logRepository;
    this._passwordHash = passwordHash;
    this._roleCheck = roleCheck;
  }

  async execute(useCasePayload: RegisterUserPayload): Promise<IRegisteredUser> {
    const { username, password, fullName, email, key } = useCasePayload;
    let role: string = this._roleCheck.verifyKey(key);
    const registerUser: RegisterUser = new RegisterUser({
      username,
      password,
      fullName,
      email,
      role,
    });

    await this._userRepository.verifyUserExist(
      registerUser.username,
      registerUser.email
    );

    registerUser.password = await this._passwordHash.hash(
      registerUser.password
    );

    const registeredUser = await this._userRepository.addUser(registerUser);
    await this._logRepository.log({
      task: `added user ${registeredUser.id}`,
    });

    return registeredUser;
  }
}
