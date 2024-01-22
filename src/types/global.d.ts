export {};

declare global {
  type VerifyPayload<T> = {
    _verifyPayload: (payload: T) => void;
  };

  /**
   * USER TYPE
   */

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

  /**
   * LOGS REPOSITORY TYPE
   */

  type ActivityLog = {
    userId: string;
    storeId: string | null;
    targetId: string;
    message: string;
  };
  type ActivityLogRepository = ActivityLog & {
    id: string;
  };
}
