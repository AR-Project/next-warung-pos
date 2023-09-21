export {};

declare global {
  type RegisterUserPayload = {
    username: string;
    password: string;
    fullName: string;
    email: string;
    key?: string;
  };
}
