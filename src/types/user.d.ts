export {};

declare global {
  type RegisterUserPayload = {
    username: string;
    password: string;
    fullName: string;
    email: string;
    key?: string;
  };

  type UserId = string;

  type ChangeUserPasswordPayload = {
    userId: UserId;
    password: string;
    newPassword: string;
  };

  type IUserRow = {
    id: string;
    username: string;
    fullName: string;
    email: string;
    role: string;
    password: string;
  };
}
