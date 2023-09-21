export {};

declare global {
  type LoginPayload = {
    username: string;
    password: string;
  };
}
