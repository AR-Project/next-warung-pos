export default interface IPasswordHash {
  hash: (password: string) => Promise<string>;
  comparePassword: (plain: any, encrypted: string) => Promise<void>;
}
