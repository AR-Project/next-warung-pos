import db from "@/infrastructure/database/orm/db";

import StoreRepository from "../StoreRepository";

import AddStore from "@/Domains/stores/entities/AddStore";

import userTableTestHelper from "../../../../test/_testHelper/UserTableHelper";
import { storeTableTestHelper } from "../../../../test/_testHelper/StoreTableHelper";

import InvariantError from "@/Commons/exceptions/InvariantError";
import NotFoundError from "@/Commons/exceptions/NotFoundError";

describe("Store Repository", () => {
  const fakeIdGenerator = {
    generate: (): string => "123",
  };

  beforeAll(async () => {
    const stubUser: IUserRow = {
      id: "user-123",
      username: "teststorerepo",
      fullName: "Test User",
      email: "test@test.com",
      role: "base",
      password: "hashedpassword",
    };

    await userTableTestHelper.addUser(stubUser);
  });

  afterEach(async () => {
    await storeTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await userTableTestHelper.cleanTable();
  });

  describe("addStore method", async () => {
    it("should persist new Store in database", async () => {
      const payload: IAddStore = {
        name: "Warung Pos",
        ownerId: "user-123",
      };

      const storeRepository = new StoreRepository(db, fakeIdGenerator);
      const storeId = await storeRepository.addStore(payload);

      const persistedStore = await storeTableTestHelper.findStoreById("123");

      expect(persistedStore).toHaveLength(1);
      expect(storeId).toBe("123");
    });
  });

  describe("verifyStoreId method", async () => {
    beforeEach(async () => {
      const stubStoreRow: Partial<IStoreRow> = {
        id: "store-123",
        name: "Warung Pos",
        ownerId: "user-123",
      };

      await storeTableTestHelper.addStore(stubStoreRow);

      return async () => {
        await storeTableTestHelper.cleanTable();
      };
    });

    // afterAll(async () => {
    // });

    test("should throw error when store is not found ", async () => {
      const storeRepository = new StoreRepository(db, fakeIdGenerator);

      // Action
      await expect(() =>
        storeRepository.verifyStoreId("wrong-id")
      ).rejects.toThrow("storeId not valid");

      await expect(() =>
        storeRepository.verifyStoreId("wrong-id")
      ).rejects.toThrowError(NotFoundError);
    });

    test("should NOT throw error when store is found", async () => {
      const storeRepository = new StoreRepository(db, fakeIdGenerator);

      await expect(storeRepository.verifyStoreId("store-123")).resolves;
      await expect(
        storeRepository.verifyStoreId("store-123")
      ).resolves.not.toThrowError(NotFoundError);
    });
  });

  describe("getStoreInfo", async () => {
    beforeAll(async () => {
      const stubStore: Partial<IStoreRow> = {
        id: "store-123",
        name: "Warung Pos",
        ownerId: "user-123",
      };

      await storeTableTestHelper.addStore(stubStore);
    });

    test("should return complete store info using valid storeId", async () => {
      // Prepare
      const storeRepository = new StoreRepository(db, fakeIdGenerator);

      const expectedResult: Partial<IStoreRow> = {
        id: "store-123",
        name: "Warung Pos",
        ownerId: "user-123",
      };

      // Action
      const result = await storeRepository.getStoreInfo("store-123");

      // Assert
      expect(result.name).toEqual(expectedResult.name);
      expect(result.id).toEqual(expectedResult.id);
      expect(result.ownerId).toEqual(expectedResult.ownerId);
    });
  });

  describe("getStoreInfoByUserId", async () => {
    beforeAll(async () => {
      const stubStore: Partial<IStoreRow> = {
        id: "store-123",
        name: "Warung Pos",
        ownerId: "user-123",
        createdAt: new Date("2 Jan 2000").toISOString(),
        modifiedAt: new Date("2 Jan 2000").toISOString(),
      };

      await storeTableTestHelper.addStore(stubStore);
      return async () => {
        await storeTableTestHelper.cleanTable();
      };
    });

    test("should return complete store info using valid userId", async () => {
      // Prepare
      const storeRepository = new StoreRepository(db, fakeIdGenerator);

      const expectedResult: Partial<IStoreRow> = {
        id: "store-123",
        name: "Warung Pos",
        ownerId: "user-123",
        createdAt: new Date("2 Jan 2000").toISOString(),
        modifiedAt: new Date("2 Jan 2000").toISOString(),
      };

      // Action
      const result = await storeRepository.getStoresByUserId("user-123");

      // Assert
      expect(result[0].name).toEqual(expectedResult.name);
      //   expect(result[0]).toEqual(expectedResult);
      expect(result[0].id).toEqual(expectedResult.id);
      expect(result[0].ownerId).toEqual(expectedResult.ownerId);
      expect(new Date(result[0].createdAt).toISOString()).toEqual(
        expectedResult.createdAt
      );
      expect(new Date(result[0].modifiedAt).toISOString()).toEqual(
        expectedResult.modifiedAt
      );
    });
  });
});
