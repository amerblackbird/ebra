import {and, eq} from "drizzle-orm";

import type {CreateUserDto} from "../schemas/users.schema";
import {db, logins, users, wallets} from "../db/schema";
import {PasswordUtils} from "../utils/password";
import {ExceptionModel} from "../models/exception";
import ERROR_CODES from "../constants/errors";

/**
 * AccountsService handles the logic for managing user accounts.
 */
export class AccountsService {

    constructor() {
    }


    /**
     * Creates a new user account.
     * @param dto - The data transfer object containing user details.
     * @returns The newly created user.
     * @throws ExceptionModel if the email or username is already registered.
     */
    async create(dto: CreateUserDto) {

        const {username, email, name, password} = dto;

        // Check if the email is already registered
        const existsEmail = await this.findOneByEmailAndRole(email, "user");
        if (existsEmail) {
            throw new ExceptionModel(ERROR_CODES.EMAIL_ALREADY_REGISTERED)
        }

        // Check if the username is already registered
        const existsUser = await this.findOneByUsername(username)
        if (existsUser) {
            throw new ExceptionModel(ERROR_CODES.USERNAME_ALREADY_REGISTERED)
        }

        // Hash the password
        const salt = PasswordUtils.getSalt();
        const hashedPassword = PasswordUtils.hashPassword(password, salt);

        // Start a transaction
        const result = await db.transaction(async (tx) => {
            // Insert the new user
            const [newUser] = await tx.insert(users)
                .values({
                    username,
                    email,
                    name,
                }).returning();

            // Insert the login record
            await tx.insert(logins).values({
                userId: newUser.id,
                salt,
                password: hashedPassword,
                ipAddress: "127.0.0.1",
                userAgent: "User-Agent-String"
            });

            // Insert the wallet record
            await tx.insert(wallets).values({
                userId: newUser.id,
                balance: 0
            });

            return newUser;
        });

        return result;

    }

    /**
     * Finds a user by their username.
     * @param username - The username to search for.
     * @returns The user if found, otherwise undefined.
     */
    async findOneByUsername(username: string) {
        const existing = await db.select().from(users).where(eq(users.username, username)).execute();
        return existing.length > 0 ? existing[0] : undefined;
    }

    /**
     * Finds a user by their email and role.
     * @param email - The email to search for.
     * @param role - The role to search for.
     * @returns The user if found, otherwise undefined.
     */
    async findOneByEmailAndRole(email: string, role: string) {
        const existing = await db.select().from(users).where(and(eq(users.email, email), eq(users.role, role))).execute();
        return existing.length > 0 ? existing[0] : undefined;
    }

    /**
     * Finds login details by user ID.
     * @param userId - The user ID to search for.
     * @returns The login details if found, otherwise undefined.
     */
    async findLoginByUserId(userId: string) {
        const existing = await db.select().from(logins).where(eq(logins.userId, userId)).execute();
        return existing.length > 0 ? existing[0] : undefined;
    }

}