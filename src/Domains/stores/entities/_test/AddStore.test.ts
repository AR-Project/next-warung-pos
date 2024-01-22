// @ts-nocheck

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import AddStore from "../AddStore";

describe("AddStore Entities", () => {
  it("should throw error when no data is supplied", () => {
    expect(() => new AddStore()).toThrowError("ADD_STORE.PAYLOAD_EMPTY");
  });

  it("should throw error when invalid type / missing payload is supplied", () => {
    // Arrange
    const payload = {
      ownerId: 123,
      name: true,
    };

    expect(() => new AddStore(payload)).toThrowError(
      "ADD_STORE.INVALID_PAYLOAD"
    );
  });

  it("should create AddStore Object correctly when supplied with correct payload", () => {
    const payload: IAddStore = {
      ownerId: "user-123",
      name: "Test Store",
    };

    const addStore = new AddStore(payload);

    expect(addStore.ownerId).toBe("user-123");
    expect(addStore.name).toBe("Test Store");
  });
});
