import IRoleCheck from "@/Application/security/RoleCheck";

export default class LevelCheckConcrete implements IRoleCheck {
  verifyKey(key: any): string {
    const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

    const isAdminRegisterEnabled = process.env.ADMIN_REGISTER === "true";
    const isKeyMatchWithAdminToken = ADMIN_TOKEN === key;

    if (key == null) return "base";

    if (isAdminRegisterEnabled && isKeyMatchWithAdminToken) {
      return "admin";
    }

    return "base";
  }
}
