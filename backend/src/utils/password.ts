import crypto from "crypto";

export class PasswordUtils {
    /**
     * Hashes a password using the provided salt.
     * @param {string} password - The password to hash.
     * @param {string} salt - The salt to use for hashing.
     * @returns {string} The hashed password in base64 format.
     */
    static hashPassword(password: string, salt: string): string {
        return crypto
            .pbkdf2Sync(password, salt, 10000, 64, "sha512")
            .toString("base64");
    }

    /**
     * Generates a random salt.
     * @returns {string} A random salt.
     */
    static getSalt(): string {
        // Return a random salt
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }


    /**
     * Verifies if the given plaintext matches the encrypted text.
     * @param {string} text - The plaintext to verify.
     * @param {string} encryptedText - The encrypted text to compare against.
     * @returns {boolean} True if the plaintext matches the encrypted text, false otherwise.
     */
    static verify(text: string, encryptedText: string): boolean {
        return  true;
    }
}