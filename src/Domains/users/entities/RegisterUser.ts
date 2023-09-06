export type IRegisterUser = {
  username: string;
  password: string;
  fullName: string;
  email: string;
  role: string;
};

type IRegisterUserEntities = IRegisterUser & {
  _verifyPayload(payload: IRegisterUser): void;
};

export default class RegisterUser implements IRegisterUserEntities {
  username: string;
  password: string;
  fullName: string;
  email: string;
  role: string;

  constructor(payload: IRegisterUser) {
    this._verifyPayload(payload);

    const { username, password, fullName, email, role }: IRegisterUser =
      payload;

    this.username = username;
    this.password = password;
    this.fullName = fullName;
    this.email = email;
    this.role = role ? role : "user";
  }

  _verifyPayload({ username, password, fullName, email }: IRegisterUser): void {
    if (username == null || password == null || fullName == null) {
      throw new Error("REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (
      typeof username !== "string" ||
      typeof password !== "string" ||
      typeof email !== "string" ||
      typeof fullName !== "string"
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
