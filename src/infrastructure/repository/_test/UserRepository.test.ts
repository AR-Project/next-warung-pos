import db from "@/infrastructure/database/orm/db";
import userTableTestHelper from "../../../../test/_testHelper/UserTableHelper";
import UserRepository from "../UserRepository";
import { use } from "react";
import InvariantError from "@/Commons/exceptions/InvariantError";

describe("UserRepository", () => {
  const fakeIdGenerator = {
    generate: (): string => "123",
  }; // stub!

  afterEach(async () => {
    await userTableTestHelper.cleanTable();
  });

  describe("verifyAvailableUsernam", async () => {
    it("should throw Invariant Error when username is already exist", async () => {
      await userTableTestHelper.addUser({ username: "tester" });
      // await userTableTestHelper.cleanTable();

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
});
