import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import AddMenuCategory from "../addMenuCategory";

describe.concurrent("AddStore Entities", () => {
  it("should throw error when no data is supplied", () => {
    //@ts-expect-error test
    expect(() => new AddMenuCategory()).toThrowError(
      "ADD_MENU_CATEGORY.PAYLOAD_EMPTY"
    );
  });

  it("should throw error when invalid type / missing payload is supplied", () => {
    // Arrange
    const payload = {
      userId: 123,
      storeId: true,
      name: {},
      color: "test",
    };

    // @ts-expect-error error handling test
    expect(() => new AddMenuCategory(payload)).toThrowError(
      "ADD_MENU_CATEGORY.INVALID_PAYLOAD"
    );
  });

  it("should create AddStore Object correctly when supplied with correct payload without color", () => {
    const payload: IAddMenuCategory = {
      userId: "user-123",
      storeId: "store-123",
      name: "test",
    };

    const addMenuCategory = new AddMenuCategory(payload);

    expect(addMenuCategory.userId).toBe("user-123");
    expect(addMenuCategory.name).toBe("test");
    expect(addMenuCategory.color).toBe("#1d4ed8");
  });

  it("should create AddStore Object correctly when supplied with correct payload", () => {
    const payload: IAddMenuCategory = {
      userId: "user-123",
      storeId: "store-123",
      name: "test",
      color: "#ffffff",
    };

    const addMenuCategory = new AddMenuCategory(payload);

    expect(addMenuCategory.userId).toBe("user-123");
    expect(addMenuCategory.name).toBe("test");
    expect(addMenuCategory.color).toBe("#ffffff");
  });
});
