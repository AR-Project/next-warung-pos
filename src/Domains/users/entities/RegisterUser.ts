export interface IRegisterUser {
  username: string;
  password: string;
  fullname: string;
  email: string;
  role?: string;
}

interface IRegisterUserEntities extends IRegisterUser {
  _verifyPayload(payload: IRegisterUser): void;
}

export default class RegisterUser implements IRegisterUserEntities {
  username: string;
  password: string;
  fullname: string;
  email: string;
  role: string;

  constructor(payload: IRegisterUser) {
    this._verifyPayload(payload);

    const { username, password, fullname, email, role }: IRegisterUser =
      payload;

    this.username = username;
    this.password = password;
    this.fullname = fullname;
    this.email = email;
    this.role = role ? role : "user";
  }

  _verifyPayload({
    username,
    password,
    fullname,
    email,
    role,
  }: IRegisterUser): void {
    if (username == null || password == null || fullname == null) {
      throw new Error("REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (
      typeof username !== "string" ||
      typeof password !== "string" ||
      typeof email !== "string" ||
      typeof fullname !== "string"
    ) {
      throw new Error("REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }

    if (username.length > 50) {
      throw new Error("REGISTER_USER.USERNAME_LIMIT_CHAR");
    }

    if (username.match(/^[\w]+$/) == null) {
      throw new Error("REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER");
    }
  }
}
