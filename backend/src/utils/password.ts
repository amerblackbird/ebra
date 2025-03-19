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
     * Generates a random string of the specified length.
     * @param {number} length - The length of the random string.
     * @returns {string} A random string of the specified length.
     */
    static getRandomString(length: number): string {
        // Return a random string of the specified length
        return Math.random().toString(36).substring(2, length + 2);
    }

    /**
     * Generates a random salt.
     * @returns {string} A random salt.
     */
    static getSalt(): string {
        // Return a random salt
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
}