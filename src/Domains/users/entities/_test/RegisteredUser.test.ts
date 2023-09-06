import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import RegisteredUser from "../RegisteredUser";

describe("a RegisteredUser entities", () => {
  it("should throw error when payload did not contain needed property", () => {
    // Arrange
    const payload = {
      username: "arproject",
      fullName: "AR Project",
      role: "base",
    };

    // Action and Assert
    // @ts-expect-error testing error
    expect(() => new RegisteredUser(payload)).toThrowError(
      "REGISTERED_USER.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error when payload did not meet data type specification", () => {
    // Arrange
    const payload = {
      id: 123,
      username: "dicoding",
      fullName: {},
      role: "base",
    };

    // Action and Assert
    // @ts-expect-error testing error
    expect(() => new RegisteredUser(payload)).toThrowError(
      "REGISTERED_USER.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should create registeredUser object correctly", () => {
    // Arrange
    const payload = {
      id: "user-123",
      username: "dicoding",
      fullName: "Dicoding Indonesia",
      role: "superAdmin",
    };

    // Action
    const registeredUser = new RegisteredUser(payload);

    // Assert
    expect(registeredUser.id).toEqual("user-123");
    expect(registeredUser.username).toEqual(payload.username);
    expect(registeredUser.fullName).toEqual(payload.fullName);
    expect(registeredUser.role).toEqual(payload.role);
  });
});
