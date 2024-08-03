/**
 * Most importantly, do test on sortOrder update on multiple row from single array
 */

import db from "@/infrastructure/database/orm/db";

import { storeTableTestHelper } from "../../../../test/_testHelper/StoreTableHelper";
import userTableTestHelper from "../../../../test/_testHelper/UserTableHelper";
import { storeMenuCategoriesTableHelper } from "../../../../test/_testHelper/MenuCategoryTableHelper";

import MenuCategoryRepository from "../MenuCategoryRepository";

import NotFoundError from "@/Commons/exceptions/NotFoundError";

describe.sequential("Menu Category Repository", () => {
  const fakeIdGenerator = {
    generate: (): string => "123",
  };

  beforeAll(async () => {
    const stubUser: IUserRow = {
      id: "user-123",
      username: "testcategoryrepo",
      fullName: "Test User",
      email: "test@test.com",
      role: "base",
      password: "hashedpassword",
    };

    const stubStore: IStoreRow = {
      id: "store-123",
      name: "Test Category Repo",
      userId: "user-123",
      createdAt: new Date("1 Jan 2000").toUTCString(),
      modifiedAt: new Date("1 Jan 2000").toUTCString(),
    };

    await userTableTestHelper.addUser(stubUser);
    await storeTableTestHelper.addStore(stubStore);

    return async () => {
      await storeTableTestHelper.cleanTable();
      await userTableTestHelper.cleanTable();
    };
  });

  afterEach(async () => {
    await storeMenuCategoriesTableHelper.cleanTable();
  });

  describe.sequential("getCategoriesCountByStoreId", async () => {
    test("should return 0 when store have no categories", async () => {
      const menuCategoryRepository = new MenuCategoryRepository(
        db,
        fakeIdGenerator
      );
      const categoriesCount =
        await menuCategoryRepository.getCategoriesCountByStoreId("store-123");
      expect(categoriesCount).toBe(0);
    });

    test("should return correct value of total category a store have", async () => {
      await storeMenuCategoriesTableHelper.addCategory({
        id: "cat-001",
        name: "Category #1",
      });
      await storeMenuCategoriesTableHelper.addCategory({
        id: "cat-002",
        name: "Category #2",
      });
      await storeMenuCategoriesTableHelper.addCategory({
        id: "cat-003",
        name: "Category #2",
      });

      const menuCategoryRepository = new MenuCategoryRepository(
        db,
        fakeIdGenerator
      );

      const categoriesCount =
        await menuCategoryRepository.getCategoriesCountByStoreId("store-123");

      expect(categoriesCount).toBe(3);
    });
  });

  describe("addMenuCategory", async () => {
    test("should persist data correctly on database", async () => {
      const payloadA: Required<IAddMenuCategory> = {
        userId: "user-123",
        storeId: "store-123",
        name: "Test Category #1",
        color: "#ffffff",
      };

      const menuCategoryRepository = new MenuCategoryRepository(
        db,
        fakeIdGenerator
      );

      const categoryIdA = await menuCategoryRepository.addMenuCategory(
        payloadA
      );

      const categories = await storeMenuCategoriesTableHelper.findById(
        "cat-123"
      );

      expect(categoryIdA).toBe("cat-123");
      expect(categories.id).toBe("cat-123");
      expect(categories.sortOrder).toBe(0);
    });
  });

  describe.sequential("getMenuCategoryInfo method", async () => {
    test("should throw error when no category exist", async () => {
      const menuCategoryRepository = new MenuCategoryRepository(
        db,
        fakeIdGenerator
      );

      await expect(() =>
        menuCategoryRepository.getMenuCategoryInfo("notExistId")
      ).rejects.toThrow("categoryId not valid");
      await expect(() =>
        menuCategoryRepository.getMenuCategoryInfo("notExistId")
      ).rejects.toThrowError(NotFoundError);
    });

    test("should not throw error when a categoryExist", async () => {
      // Arrange
      const customFakeGenerator = {
        generate: () => Math.round(Math.random() * 100).toString(),
      };

      const payloadA: Required<IAddMenuCategory> = {
        userId: "user-123",
        storeId: "store-123",
        name: "Test Category #1",
        color: "#ffffff",
      };
      const payloadB: Required<IAddMenuCategory> = {
        userId: "user-123",
        storeId: "store-123",
        name: "Test Category #2",
        color: "#ffffff",
      };

      const menuCategoryRepository = new MenuCategoryRepository(
        db,
        customFakeGenerator
      );

      const categoryIDA = await menuCategoryRepository.addMenuCategory(
        payloadA
      );
      const categoryIDB = await menuCategoryRepository.addMenuCategory(
        payloadB
      );

      // Assert
      const resultA = await menuCategoryRepository.getMenuCategoryInfo(
        categoryIDA
      );
      const resultB = await menuCategoryRepository.getMenuCategoryInfo(
        categoryIDB
      );

      // Test
      expect(resultA.id).toBe(categoryIDA);
      expect(resultB.id).toBe(categoryIDB);
      expect(resultA.name).toBe("Test Category #1");
      expect(resultB.name).toBe("Test Category #2");
      expect(resultA.sortOrder).toBe(0);
      expect(resultB.sortOrder).toBe(1);
    });
  });

  describe("getAllCategoriesByStoreId", async () => {
    test("should return array of category id, sorted by sortOrder value", async () => {
      // arrange
      await storeMenuCategoriesTableHelper.addCategory({
        id: "cat-01",
        name: "Test #1",
        sortOrder: 0,
      });
      await storeMenuCategoriesTableHelper.addCategory({
        id: "cat-02",
        name: "Test #2",
        sortOrder: 2,
      });
      await storeMenuCategoriesTableHelper.addCategory({
        id: "cat-03",
        name: "Test #3",
        sortOrder: 1,
      });

      const menuCategoryRepository = new MenuCategoryRepository(
        db,
        fakeIdGenerator
      );

      // action
      const categoryids =
        await menuCategoryRepository.getAllCategoriesIdsByStoreId("store-123");

      // assert
      expect(categoryids).toEqual(["cat-01", "cat-03", "cat-02"]);
    });
  });

  describe("updateMenuCategory method", async () => {
    test("should update and persist new category payload", async () => {
      // Arrange
      await storeMenuCategoriesTableHelper.addCategory({
        color: "#ffffff",
        id: "cat-01",
        name: "Test #1",
        sortOrder: 0,
        createdAt: new Date("1 Jan 2000").toISOString(),
        modifiedAt: new Date("1 Jan 2000").toISOString(),
      });

      const updatePayload: IUpdateMenuCategory = {
        id: "cat-01",
        name: "Updated Test #1",
        color: "#111111",
      };

      const menuCategoryRepository = new MenuCategoryRepository(
        db,
        fakeIdGenerator
      );

      // Action
      const oldCategory = await menuCategoryRepository.getMenuCategoryInfo(
        "cat-01"
      );
      const updatedCategory = await menuCategoryRepository.updateMenuCategory(
        updatePayload
      );

      // Assert
      expect(oldCategory.name).toBe("Test #1");
      expect(oldCategory.color).toBe("#ffffff");
      expect(updatedCategory.name).toBe("Updated Test #1");
      expect(updatedCategory.color).toBe("#111111");
      expect(oldCategory.modifiedAt).not.equal(updatedCategory.modifiedAt);

      console.log(oldCategory);
      console.log(updatedCategory);
    });
  });

  describe("deleteMenuCategory method", async () => {
    test("should update current category isDeleted value to true", async () => {
      // arrange

      await storeMenuCategoriesTableHelper.addCategory({
        color: "#ffffff",
        id: "cat-01",
        name: "Test #1",
      });

      const menuCategoryRepository = new MenuCategoryRepository(
        db,
        fakeIdGenerator
      );

      // Action
      const originalCategory = await menuCategoryRepository.getMenuCategoryInfo(
        "cat-01"
      );
      await menuCategoryRepository.deleteMenuCategory("cat-01");
      const deletedCategory = await menuCategoryRepository.getMenuCategoryInfo(
        "cat-01",
        true
      );

      // Assert
      expect(originalCategory.isDeleted).toBeFalsy();
      expect(deletedCategory.isDeleted).toBeTruthy();

      console.log(originalCategory);
      console.log(deletedCategory);
    });
  });

  describe("updateCategorySortOrder method", async () => {
    test("should update accordingly", async () => {
      // arrange
      await storeMenuCategoriesTableHelper.addCategory({
        id: "cat-01",
        name: "Test #1",
        sortOrder: 0,
      });
      await storeMenuCategoriesTableHelper.addCategory({
        id: "cat-02",
        name: "Test #2",
        sortOrder: 1,
      });
      await storeMenuCategoriesTableHelper.addCategory({
        id: "cat-03",
        name: "Test #3",
        sortOrder: 2,
      });

      const updateSortOrderPayload: IUpdateSortOrder[] = [
        { id: "cat-01", sortOrder: 2 },
        { id: "cat-02", sortOrder: 1 },
        { id: "cat-03", sortOrder: 0 },
      ];

      const menuCategoryRepository = new MenuCategoryRepository(
        db,
        fakeIdGenerator
      );

      // Action
      const categoryOne = await storeMenuCategoriesTableHelper.findById(
        "cat-01"
      );
      const categoryTwo = await storeMenuCategoriesTableHelper.findById(
        "cat-02"
      );
      const categoryThree = await storeMenuCategoriesTableHelper.findById(
        "cat-03"
      );

      await menuCategoryRepository.updateCategorySortOrder(
        updateSortOrderPayload
      );

      const categoryOneUpdated = await storeMenuCategoriesTableHelper.findById(
        "cat-01"
      );
      const categoryTwoUpdated = await storeMenuCategoriesTableHelper.findById(
        "cat-02"
      );
      const categoryThreeUpdated =
        await storeMenuCategoriesTableHelper.findById("cat-03");

      expect(categoryOne.sortOrder).toBe(0);
      expect(categoryTwo.sortOrder).toBe(1);
      expect(categoryThree.sortOrder).toBe(2);
      expect(categoryOneUpdated.sortOrder).toBe(2);
      expect(categoryTwoUpdated.sortOrder).toBe(1);
      expect(categoryThreeUpdated.sortOrder).toBe(0);
    });
  });
});
