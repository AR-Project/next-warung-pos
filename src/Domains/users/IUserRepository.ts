import { IRegisterUser } from "./entities/RegisterUser";
import { IRegisteredUser } from "./entities/RegisteredUser";

export default interface IUserRepository {
  verifyAvailableUsername: (username: string) => Promise<void>;
  addUser: (registerUser: IRegisterUser) => Promise<IRegisteredUser>;
  getPasswordByUsername: (username: string) => Promise<string>;
  getUserInfoByUsername: (username: string) => Promise<UserInfoWithPassword>;
  updatePassword: (id: string, newPassword: string) => Promise<void>;
}
