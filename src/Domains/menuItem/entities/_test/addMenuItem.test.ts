// @ts-nocheck

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import AddMenuItem from "../addMenuItem";

describe("addMenuItem entities", () => {
  test("should throw error when payload is not complete", async () => {
    expect(() => new AddMenuItem()).toThrowError("ADD_MENU_ITEM.PAYLOAD_EMPTY");
  });
  test("should throw error when supplied with invalid or missing payload properties", () => {
    const payload = {
      userId: 123,
      storeId: true,
      categoryId: ["invalid type"],
      name: {},
      color: "test",
    };

    expect(() => new AddMenuItem(payload)).toThrowError(
      "ADD_MENU_ITEM.INVALID_PAYLOAD"
    );
  });

  test("should not throw error when color properties is missing from payload", () => {
    const payload: IAddStore = {
      userId: "user-123",
      storeId: "store-123",
      categoryId: "cat-123",
      name: "test",
    };

    const addMenuItem = new AddMenuItem(payload);

    expect(() => new AddMenuItem(payload)).not.toThrowError();
    expect(addMenuItem.categoryId).toBe("cat-123");
    expect(addMenuItem.userId).toBe("user-123");
    expect(addMenuItem.name).toBe("test");
    expect(addMenuItem.storeId).toBe("store-123");
    expect(addMenuItem.color).toBe("#1d4ed8");
  });

  test("should initialize object correctly", () => {
    const payload: IAddStore = {
      userId: "user-123",
      storeId: "store-123",
      categoryId: "cat-123",
      name: "test",
      color: "#FFFFFF",
    };

    const addMenuItem = new AddMenuItem(payload);

    expect(() => new AddMenuItem(payload)).not.toThrowError();
    expect(addMenuItem.categoryId).toBe("cat-123");
    expect(addMenuItem.userId).toBe("user-123");
    expect(addMenuItem.name).toBe("test");
    expect(addMenuItem.storeId).toBe("store-123");
    expect(addMenuItem.color).toBe("#FFFFFF");
  });
});
