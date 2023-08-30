import { IRegisterUser } from "./entities/RegisterUser";
import { IRegisteredUser } from "./entities/RegisteredUser";
import { IUserCoreInfo } from "./entities/UserCoreInfo";

export default interface IUserRepository {
  verifyAvailableUsername: (username: string) => Promise<void>;
  addUser: (registerUser: IRegisterUser) => Promise<IRegisteredUser>;
  getPasswordByUsername: (username: string) => Promise<string>;
  getCoreInfoByUsername: (username: string) => Promise<IUserCoreInfo>;
  changePassword: (id: string, newPassword: string) => Promise<void>;
}
