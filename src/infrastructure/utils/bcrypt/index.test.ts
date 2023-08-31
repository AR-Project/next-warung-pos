import AuthenticationError from "@/Commons/exceptions/AuthenticationError";
import PasswordHashImplementation from ".";

describe("BcryptEncryptionHelper", () => {
  describe("hash function", () => {
    it("should encrypt password correctly", async () => {
      // Arrange
      const bcryptEncryptionHelper = new PasswordHashImplementation();

      // Action
      const encryptedPassword = await bcryptEncryptionHelper.hash(
        "plain_password"
      );

      // Assert
      expect(typeof encryptedPassword).toEqual("string");
      expect(encryptedPassword).not.toEqual("plain_password");
    });
  });

  describe("comparePassword function", () => {
    it("should throw AuthenticationError if password not match", async () => {
      // Arrange
      const bcryptEncryptionHelper = new PasswordHashImplementation();

      // Act & Assert
      await expect(
        bcryptEncryptionHelper.comparePassword(
          "plain_password",
          "encrypted_password"
        )
      ).rejects.toThrow(AuthenticationError);
    });

    it("should not return AuthenticationError if password match", async () => {
      // Arrange
      const bcryptEncryptionHelper = new PasswordHashImplementation();
      const plainPassword = "secret";
      const encryptedPassword = await bcryptEncryptionHelper.hash(
        plainPassword
      );

      // Act & Assert
      await expect(
        bcryptEncryptionHelper.comparePassword(plainPassword, encryptedPassword)
      ).resolves.not.toThrow(AuthenticationError);
    });
  });
});
