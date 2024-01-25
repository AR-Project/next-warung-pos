export default interface ILogRepository {
  log: (payload: ActivityLog) => Promise<void>;
}
