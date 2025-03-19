import {eq} from "drizzle-orm";

import type {CreateUserDto} from "../schemas/usersSchema";
import {db, logins, users, wallets} from "../db/schema";
import {PasswordUtils} from "../utils/password";
import {ExceptionModel} from "../models/exception";
import ERROR_CODES from "../constants/errors";

export class AccountsService {

    constructor() {
    }

    async create(dto: CreateUserDto) {

        const {username, email, name, password} = dto;

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

    async findOneByUsername(username: string) {
        const existing = await db.select().from(users).where(eq(users.username, username)).execute();
        return existing.length > 0 ? existing[0] : undefined;
    }

}