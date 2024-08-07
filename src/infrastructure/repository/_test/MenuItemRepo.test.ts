/**
 * Most importantly, do test on sortOrder update on multiple row from single array
 */

import db from "@/infrastructure/database/orm/db";

import { storeTableTestHelper } from "../../../../test/_testHelper/StoreTableHelper";
import userTableTestHelper from "../../../../test/_testHelper/UserTableHelper";
import { storeMenuCategoriesTableHelper } from "../../../../test/_testHelper/MenuCategoryTableHelper";

import MenuItemRepository from "../MenuItemRepository";

import { storeMenuItemTableHelper } from "../../../../test/_testHelper/MenuItemTableHelper";

describe.sequential("Menu Item Repository", () => {
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
      userId: stubUser.id,
      createdAt: new Date("1 Jan 2000").toUTCString(),
      modifiedAt: new Date("1 Jan 2000").toUTCString(),
    };

    const stubCategories: IMenuCategoryRow[] = [
      {
        id: "cat-001",
        userId: "user-123",
        storeId: "store-123",
        name: "Category #1",
        color: "#000000",
        sortOrder: 0,
        createdAt: new Date("1 Jan 2000").toUTCString(),
        modifiedAt: new Date("1 Jan 2000").toUTCString(),
        isDeleted: false,
      },
      {
        id: "cat-002",
        userId: "user-123",
        storeId: "store-123",
        name: "Category #2",
        color: "#000000",
        sortOrder: 0,
        createdAt: new Date("1 Jan 2000").toUTCString(),
        modifiedAt: new Date("1 Jan 2000").toUTCString(),
        isDeleted: false,
      },
    ];

    await userTableTestHelper.addUser(stubUser);
    await storeTableTestHelper.addStore(stubStore);
    await storeMenuCategoriesTableHelper.addCategory(stubCategories[0]);
    await storeMenuCategoriesTableHelper.addCategory(stubCategories[1]);

    return async () => {
      await storeMenuCategoriesTableHelper.cleanTable();
      await storeTableTestHelper.cleanTable();
      await userTableTestHelper.cleanTable();
    };
  });

  afterEach(async () => {
    await storeMenuItemTableHelper.cleanTable();
  });

  // 3 items on cat-001, 1 items on cat-002
  const preloadItems: IMenuItemRow[] = [
    {
      userId: "user-123",
      storeId: "store-123",
      categoryId: "cat-001",
      name: "Test Item #1",
      color: "#000000",
      id: "item-000",
      sortOrder: 0,
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
      isAvailable: false,
      isDeleted: false,
      imageUrl: null,
      price: 1000,
    },
    {
      userId: "user-123",
      storeId: "store-123",
      categoryId: "cat-001",
      name: "Test Item #2",
      color: "#000000",
      id: "item-001",
      sortOrder: 1,
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
      isAvailable: false,
      isDeleted: false,
      imageUrl: null,
      price: 1000,
    },
    {
      userId: "user-123",
      storeId: "store-123",
      categoryId: "cat-001",
      name: "Test Item #3",
      color: "#000000",
      id: "item-002",
      sortOrder: 2,
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
      isAvailable: false,
      isDeleted: false,
      imageUrl: null,
      price: 1000,
    },
    {
      userId: "user-123",
      storeId: "store-123",
      categoryId: "cat-002",
      name: "Test Item #1a",
      color: "#000000",
      id: "item-003",
      sortOrder: 1,
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
      isAvailable: false,
      isDeleted: false,
      imageUrl: null,
      price: 1000,
    },
  ];

  describe.sequential("countByCategoryId", async () => {
    test("should return correct value, when called with categoryId", async () => {
      await Promise.all(
        preloadItems.map((item) => storeMenuItemTableHelper.add(item))
      );

      const menuItemRepository = new MenuItemRepository(db, fakeIdGenerator);

      const result = await menuItemRepository.countByCategoryId("cat-001");

      expect(preloadItems.length).toBe(4);
      expect(result).toBe(3);
    });
  });

  describe.sequential("add method on menuItem", async () => {
    test("should add single item correctly", async () => {
      const menuItemRepository = new MenuItemRepository(db, fakeIdGenerator);
      const testMenuItemPayload = {
        userId: "user-123",
        storeId: "store-123",
        categoryId: "cat-001",
        name: "Test Item #1",
        color: "#000000",
        price: 0,
        imageUrl: "n/a",
      };

      const result = await menuItemRepository.add(testMenuItemPayload);
      const item = await storeMenuItemTableHelper.findById(result);

      expect(item.name).toBe("Test Item #1");
      expect(item.color).toBe("#000000");
      expect(item.sortOrder).toBe(0);
    });

    test("should add single item with sortOrder Correctly", async () => {
      await Promise.all(
        preloadItems.map((item) => storeMenuItemTableHelper.add(item))
      );

      const testMenuItemPayload: Required<IAddMenuItemPayload> = {
        userId: "user-123",
        storeId: "store-123",
        categoryId: "cat-001",
        name: "Test Item #3",
        color: "#000000",
        price: 0,
        imageUrl: "n/a",
      };
      const menuItemRepository = new MenuItemRepository(db, fakeIdGenerator);

      const result = await menuItemRepository.add(testMenuItemPayload);
      const item = await storeMenuItemTableHelper.findById(result);

      expect(preloadItems.length).toBe(4);
      expect(item.name).toBe("Test Item #3");
      expect(item.color).toBe("#000000");
      expect(item.sortOrder).toBe(3);
    });
  });

  describe.sequential("getById method", async () => {
    test("should throw error when id is not valid", async () => {
      const menuItemRepository = new MenuItemRepository(db, fakeIdGenerator);
      const result = await menuItemRepository.add({
        userId: "user-123",
        storeId: "store-123",
        categoryId: "cat-001",
        name: "Test #1",
        color: "#000000",
        price: 0,
        imageUrl: "n/a",
      });
      const item = await storeMenuItemTableHelper.findById(result);

      await expect(() =>
        menuItemRepository.getById("invalid_id")
      ).rejects.toThrow("Item tidak ditemukan");

      expect(item.name).toBe("Test #1");
      expect(item.color).toBe("#000000");
    });

    test("shold return correct item, when called with valid menu Item ID", async () => {
      const menuItemRepository = new MenuItemRepository(db, fakeIdGenerator);
      const result = await menuItemRepository.add({
        userId: "user-123",
        storeId: "store-123",
        categoryId: "cat-001",
        name: "Test #1",
        color: "#000000",
        price: 0,
        imageUrl: "n/a",
      });

      const itemFound = await menuItemRepository.getById("item-123");

      expect(result).toBe(itemFound.id);
      expect(itemFound.name).toBe("Test #1");
      expect(itemFound.color).toBe("#000000");
    });
  });

  describe.sequential("getByCategoryId method", async () => {
    test("should return correct value when called with valid category Id", async () => {
      const menuItemRepository = new MenuItemRepository(db, fakeIdGenerator);

      await Promise.all(
        preloadItems.map((item) => storeMenuItemTableHelper.add(item))
      );

      const resultA = await menuItemRepository.getByCategoryId("cat-001");
      const resultB = await menuItemRepository.getByCategoryId("cat-002");
      const resultC = await menuItemRepository.getByCategoryId(
        "invalidCategoryId"
      );

      expect(resultA.length).toBe(3);
      expect(resultB.length).toBe(1);
      expect(resultC.length).toBe(0);
    });
  });

  describe.sequential("getByCategoryIds", async () => {
    test("should return items correctly", async () => {
      const menuItemRepository = new MenuItemRepository(db, fakeIdGenerator);

      await Promise.all(
        preloadItems.map((item) => storeMenuItemTableHelper.add(item))
      );

      const items = await menuItemRepository.getByCategoryIds([
        "cat-001",
        "cat-002",
      ]);

      expect(items.length).toBe(4);
    });
  });

  describe.sequential("updateSortOrder method", async () => {
    test("should update items sortOrder correctly", async () => {
      await Promise.all(
        preloadItems.map((item) => storeMenuItemTableHelper.add(item))
      );

      const menuItemRepository = new MenuItemRepository(db, fakeIdGenerator);

      const newSortOrder: IUpdateSortOrder[] = [
        {
          id: "item-001",
          sortOrder: 0,
        },
        {
          id: "item-000",
          sortOrder: 1,
        },
        {
          id: "item-002",
          sortOrder: 2,
        },
      ];

      const beforeUpdateSort = await menuItemRepository.getByCategoryId(
        "cat-001"
      );

      await menuItemRepository.updateSortOrder(newSortOrder);

      const afterUpdateSort = await menuItemRepository.getByCategoryId(
        "cat-001"
      );

      expect(beforeUpdateSort.length).toBe(3);
      expect(afterUpdateSort.length).toBe(3);
      expect(beforeUpdateSort[0].id).toBe("item-000");
      expect(beforeUpdateSort[1].id).toBe("item-001");
      expect(beforeUpdateSort[2].id).toBe("item-002");
      expect(afterUpdateSort[0].id).toBe("item-001");
      expect(afterUpdateSort[1].id).toBe("item-000");
      expect(afterUpdateSort[2].id).toBe("item-002");
    });
  });

  describe.sequential("update method", async () => {
    test("should update single row item correctly", async () => {
      await storeMenuItemTableHelper.add({});

      const menuItemRepository = new MenuItemRepository(db, fakeIdGenerator);

      const before = await menuItemRepository.getById("item-000");

      const updatePayload: IUpdateMenuItem = {
        id: "item-000",
        name: "Update Item Name",
        color: "#555555",
        price: 50000,
      };

      await menuItemRepository.update(updatePayload);

      const after = await menuItemRepository.getById("item-000");

      expect(before.name).toBe("Test Item #1");
      expect(before.color).toBe("#000000");
      expect(before.price).toBe(0);
      expect(after.name).toBe("Update Item Name");
      expect(after.color).toBe("#555555");
      expect(after.price).toBe(50000);
    });
  });
});
