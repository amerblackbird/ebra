import {and, eq} from "drizzle-orm";

import type {CreateUserDto} from "../schemas/users.schema";
import {db, type LoginModel, logins, type UserModel, users, wallets} from "../db/schema";
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
    async create(dto: CreateUserDto & {
        createdBy?: UserModel
    }): Promise<UserModel> {

        const {username, email, name, password, createdBy} = dto;

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
        return await db.transaction(async (tx) => {
            // Insert the new user
            const [newUser] = await tx.insert(users)
                .values({
                    username,
                    email,
                    name,
                    createdById: createdBy?.id
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

    }

    /**
     * Finds a user by their ID.
     * @param id - The ID to search for.
     * @returns The user if found, otherwise undefined.
     */
    async findById(id: string): Promise<UserModel | undefined> {
        const existing = await db.select().from(users).where(eq(users.id, id)).limit(1).execute();
        return existing.length > 0 ? existing[0] : undefined;
    }

    /**
     * Finds a user by their username.
     * @param username - The username to search for.
     * @returns The user if found, otherwise undefined.
     */
    async findOneByUsername(username: string): Promise<UserModel | undefined> {
        const existing = await db.select().from(users).where(eq(users.username, username)).limit(1).execute();
        return existing.length > 0 ? existing[0] : undefined;
    }

    /**
     * Finds a user by their email and role.
     * @param email - The email to search for.
     * @param role - The role to search for.
     * @returns The user if found, otherwise undefined.
     */
    async findOneByEmailAndRole(email: string, role: string): Promise<UserModel | undefined> {
        const existing = await db.select().from(users).where(and(eq(users.email, email), eq(users.role, role))).limit(1).execute();
        return existing.length > 0 ? existing[0] : undefined;
    }

    /**
     * Finds login details by user ID.
     * @param userId - The user ID to search for.
     * @returns The login details if found, otherwise undefined.
     */
    async findLoginByUserId(userId: string): Promise<LoginModel | undefined> {
        const existing = await db.select().from(logins).where(eq(logins.userId, userId)).limit(1).execute();
        return existing.length > 0 ? existing[0] : undefined;
    }


    /**
     * Finds a user by their ID.
     * @param userId - The user ID to search for.
     * @returns The user if found, otherwise undefined.
     */
    async findOneById(userId: string): Promise<UserModel | undefined> {
        const existing = await db.select().from(users).where(eq(users.id, userId)).limit(1).execute();
        return existing.length > 0 ? existing[0] : undefined;
    }
}