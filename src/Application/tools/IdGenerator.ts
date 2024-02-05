export default interface IIdGenerator {
  generate: (length?: number) => string;
}
