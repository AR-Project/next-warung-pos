type UserInfoEntities = UserInfoWithPassword & VerifyPayload<UserInfo>;

export default class UserCoreInfo implements UserInfoEntities {
  id: string;
  email: string;
  password: string;
  role: string;
  username: string;
  fullName: string;

  constructor(payload: UserInfoWithPassword) {
    this._verifyPayload(payload);
    const { id, username, fullName, role, email, password } = payload;

    this.id = id;
    this.username = username;
    this.fullName = fullName;
    this.role = role;
    this.email = email;
    this.password = password;
  }

  _verifyPayload(payload: UserInfo): void {
    const { id, username, fullName, role, email } = payload;

    if (
      id == null ||
      username == null ||
      fullName == null ||
      email == null ||
      role == null
    ) {
      throw new Error("USER_CORE_INFO.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (
      typeof id !== "string" ||
      typeof username !== "string" ||
      typeof fullName !== "string" ||
      typeof email !== "string" ||
      typeof role !== "string"
    ) {
      throw new Error("USER_CORE_INFO.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }
}
