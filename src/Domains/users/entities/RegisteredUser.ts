export interface IRegisteredUser {
  id: string;
  username: string;
  fullName: string;
  role: string;
}

interface IRegisteredUserEntities extends IRegisteredUser {
  _verifyPayload(payload: IRegisteredUser): void;
}

export default class RegisteredUser implements IRegisteredUserEntities {
  id: string;
  username: string;
  fullName: string;
  role: string;

  constructor(payload: IRegisteredUser) {
    this._verifyPayload(payload);

    const { id, username, fullName, role } = payload;

    this.id = id;
    this.username = username;
    this.fullName = fullName;
    this.role = role;
  }

  _verifyPayload({ id, username, fullName, role }: IRegisteredUser): void {
    if (id == null || username == null || fullName == null || role == null) {
      throw new Error("REGISTERED_USER.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (
      typeof id !== "string" ||
      typeof username !== "string" ||
      typeof fullName !== "string" ||
      typeof role !== "string"
    ) {
      throw new Error("REGISTERED_USER.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }
}
