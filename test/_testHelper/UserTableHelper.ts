import { eq } from "drizzle-orm";
import db from "@/infrastructure/database/orm/db";
import { user } from "@/infrastructure/database/schema/user";

interface IUserRow {
  id?: string;
  username?: string;
  fullName?: string;
  email?: string;
  role?: string;
  password?: string;
}

const userTableTestHelper = {
  async addUser({
    id = "user-001",
    username = "warungpos",
    fullName = "Warung Pos",
    email = "warungpos@arproject.my.id",
    role = "user",
    password = "password",
  }: IUserRow) {
    await db
      .insert(user)
      .values({ id, username, fullName, email, role, password });
  },

  async findUserById(id: string) {
    const result = await db.select().from(user).where(eq(user.id, id));
    return result;
  },
  async cleanTable() {
    await db.delete(user);
  },
};

export default userTableTestHelper;
