export default interface ILogsRepository {
  log: (payload: ActivityLog) => Promise<void>;
}
