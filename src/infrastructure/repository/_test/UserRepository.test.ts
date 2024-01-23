import db from "@/infrastructure/database/orm/db";
import userTableTestHelper from "../../../../test/_testHelper/UserTableHelper";
import UserRepository from "../UserRepository";
import InvariantError from "@/Commons/exceptions/InvariantError";
import RegisterUser, {
  IRegisterUser,
} from "@/Domains/users/entities/RegisterUser";
import RegisteredUser from "@/Domains/users/entities/RegisteredUser";

describe("UserRepository", () => {
  const fakeIdGenerator = {
    generate: (): string => "123",
  }; // stub!

  afterEach(async () => {
    await userTableTestHelper.cleanTable();
  });

  describe("verifyAvailableUsername method", () => {
    it("should throw Invariant Error when username is already exist", async () => {
      await userTableTestHelper.addUser({ username: "tester" });

      const userRepository = new UserRepository(db, fakeIdGenerator);
      await expect(
        userRepository.verifyAvailableUsername("tester")
      ).rejects.toThrowError(InvariantError);
    });

    it("should NOT throw error, when username is available / no username in database", async () => {
      const userRepository = new UserRepository(db, fakeIdGenerator);
      await expect(userRepository.verifyAvailableUsername("tester")).resolves;
      await expect(
        userRepository.verifyAvailableUsername("tester")
      ).not.toThrowError(InvariantError);
    });
  });

  describe("addUser method", () => {
    it("should persist new user from registerUser class in database", async () => {
      const payload: IRegisterUser = {
        username: "warungpos",
        password: "secretpassword",
        fullName: "Warung Pos",
        email: "test@test.com",
        role: "user",
      };
      const user = new RegisterUser(payload);
      const userRepository = new UserRepository(db, fakeIdGenerator);
      await userRepository.addUser(user);

      const persistedUser = await userTableTestHelper.findUserById("user-123");
      expect(persistedUser).toHaveLength(1);
    });

    it("should persist new user in database, and return user object", async () => {
      const payload: IRegisterUser = {
        username: "warungpos",
        password: "secretpassword",
        fullName: "Warung Pos",
        email: "test@test.com",
        role: "user",
      };
      const user = new RegisterUser(payload);
      const userRepository = new UserRepository(db, fakeIdGenerator);

      // Action
      const returnedValue = await userRepository.addUser(user);

      expect(returnedValue).toEqual(
        new RegisteredUser({
          id: "user-123",
          username: "warungpos",
          fullName: "Warung Pos",
          role: "user",
        })
      );
    });
  });

  describe("getPasswordByUsername method", () => {
    test("should throw error when username not found", async () => {
      const userRepository = new UserRepository(db, fakeIdGenerator);
      await expect(
        userRepository.getPasswordByUsername("notexist")
      ).rejects.toThrowError(Error);
    });

    test("should return password as string when username is found", async () => {
      await userTableTestHelper.addUser({
        username: "getPasswordTest",
        password: "secretpassword",
      });
      const userRepository = new UserRepository(db, fakeIdGenerator);
      const password = await userRepository.getPasswordByUsername(
        "getPasswordTest"
      );
      expect(password).toEqual("secretpassword");
    });
  });
  describe("updatePassword method", () => {
    test("should update password on database", async () => {
      // Prepare
      await userTableTestHelper.addUser({
        id: "user-123",
        password: "oldPassword",
      });
      const userRepository = new UserRepository(db, fakeIdGenerator);

      // Action
      await userRepository.updatePassword("user-123", "newPassword");
      const userInfo = await userTableTestHelper.findUserById("user-123");

      // Assert
      expect(userInfo[0].password).toEqual("newPassword");
    });
  });
});
