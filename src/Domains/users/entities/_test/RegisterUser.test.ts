import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import RegisterUser, { IRegisterUser } from "../RegisterUser";

describe("a RegisterUser entities", () => {
  it("should throw error when payload did not contain needed property", () => {
    // Arrange
    const payload = {
      username: "abc",
      password: "abc",
    };

    // Action and Assert
    // @ts-expect-error testing error
    expect(() => new RegisterUser(payload)).toThrowError(
      "REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error when payload did not meet data type specification", () => {
    // Arrange
    const payload = {
      username: 123,
      fullname: true,
      password: "abc",
      role: 123,
    };

    // Action and Assert
    // @ts-expect-error testing error
    expect(() => new RegisterUser(payload)).toThrowError(
      "REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error when username contains more than 50 character", () => {
    // Arrange
    const payload: IRegisterUser = {
      username: "dicodingindonesiadicodingindonesiadicodingindonesiadicoding",
      fullName: "Dicoding Indonesia",
      password: "abc",
      email: "test@test.com",
      role: "base",
    };

    // Action and Assert
    expect(() => new RegisterUser(payload)).toThrowError(
      "REGISTER_USER.USERNAME_LIMIT_CHAR"
    );
  });

  it("should throw error when username contains restricted character", () => {
    // Arrange
    const payload: IRegisterUser = {
      username: "dico ding",
      fullName: "dicoding",
      password: "abc",
      email: "test@test.com",
      role: "base",
    };

    // Action and Assert
    expect(() => new RegisterUser(payload)).toThrowError(
      "REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER"
    );
  });
  it("should create registerUser object correctly with role properties", () => {
    // Arrange
    const payload: IRegisterUser = {
      username: "dicoding",
      fullName: "Dicoding Indonesia",
      password: "abc",
      email: "test@test.com",

      role: "base",
    };

    // Action
    const { username, fullName, password, role } = new RegisterUser(payload);

    // Assert
    expect(username).toEqual(payload.username);
    expect(fullName).toEqual(payload.fullName);
    expect(password).toEqual(payload.password);
    expect(role).toEqual(payload.role);
  });
});
