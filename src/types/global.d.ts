export {};

declare global {
  type VerifyPayload<T> = {
    _verifyPayload: (T) => void;
  };

  type UserInfo = {
    id: string;
    username: string;
    fullName: string;
    email: string;
    role: string;
  };

  type UserInfoWithPassword = UserInfo & {
    password: string;
  };
}
