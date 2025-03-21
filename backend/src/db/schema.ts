import {decimal, index, pgTable, text, timestamp, uuid} from 'drizzle-orm/pg-core'
import {drizzle} from 'drizzle-orm/node-postgres';
import env from "../utils/env";
import type {InferSelectModel} from "drizzle-orm";


// Define the user table schema
export const users = pgTable('users', {
    id: uuid('id').defaultRandom().primaryKey(), // UUID as primary key, generated automatically    username: text('username').notNull().unique(), // Username (must be unique)
    email: text('email').notNull(),
    name: text('name').notNull(),  // Add the name field
    username: text('username').notNull().unique(), // Username (must be unique)
    role: text('role').default('user').notNull(), // Role with default value 'user'
    createdAt: timestamp('created_at').defaultNow(), // Timestamp for when the account was created
    updatedAt: timestamp('updated_at').defaultNow(), // Timestamp for when the account was last updated,
    createdById: uuid('created_by_id'),
    updatedById: uuid('updated_by_id'),
}, (table) => {
    return {
        usernameIndex: index('users_username_idx').on(table.username)
    }
});

// Define the logins table schema
export const logins = pgTable('logins', {
    id: uuid('id').defaultRandom().primaryKey(), // UUID as primary key, generated automatically
    userId: uuid('user_id').notNull().references(() => users.id, {onDelete: 'cascade'}), // Foreign key referencing the user with ON DELETE CASCADE
    loginTime: timestamp('login_time').defaultNow(), // Timestamp for when the login occurred
    ipAddress: text('ip_address').notNull(), // IP address of the user
    userAgent: text('user_agent').notNull(), // User agent string of the browser/device
    password: text('password').notNull(), // Password (hashed)
    salt: text('salt').notNull(), // Salt for the password
    createdById: uuid('created_by_id').references(() => users.id, {onDelete: 'set null'}),
    updatedById: uuid('updated_by_id').references(() => users.id, {onDelete: 'set null'}),
});

// Define the wallet table to store user balances
export const wallets = pgTable('wallets', {
    id: uuid('id').defaultRandom().primaryKey(), // UUID as primary key for wallet
    userId: uuid('user_id').notNull().references(() => users.id, {onDelete: 'cascade'}), // Foreign key referencing the user with ON DELETE CASCADE
    balance: decimal('balance', {precision: 10, scale: 2}).notNull().$type<number>().default(0),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
    createdById: uuid('created_by_id').references(() => users.id, {onDelete: 'set null'}),
    updatedById: uuid('updated_by_id').references(() => users.id, {onDelete: 'set null'}),
})

// Define the transaction table schema
export const transactions = pgTable('transactions', {
    id: uuid('id').defaultRandom().primaryKey(), // UUID as primary key, generated automatically    username: text('username').notNull().unique(), // Username (must be unique)
    userId: uuid('user_id').notNull().references(() => users.id, {onDelete: 'set null'}), // Link to the user with ON DELETE SET NULL
    walletId: uuid('wallet_id').references(() => wallets.id, {onDelete: 'set null'}), // Link to the user with ON DELETE SET NULL
    amount: decimal('amount', {precision: 10, scale: 2}).notNull().$type<number>().default(0),
    type: text('type').notNull(), // Type of transaction (e.g., "top-up", "charge")
    status: text('status').default('pending').notNull(), // Transaction status (default is "pending")
    createdAt: timestamp('created_at').defaultNow(), // Timestamp for when the transaction was created
    updatedAt: timestamp('updated_at').defaultNow(), // Timestamp for when the account was last updated
    createdById: uuid('created_by_id').references(() => users.id, {onDelete: 'set null'}),
    updatedById: uuid('updated_by_id').references(() => users.id, {onDelete: 'set null'}),
})


export type UserModel =  InferSelectModel<typeof users>;
export type LoginModel =  InferSelectModel<typeof logins>;
export type WalletModel =  InferSelectModel<typeof wallets>;
export type TransactionModel =  InferSelectModel<typeof transactions>;



const db = drizzle(env.DATABASE_URL);

export {db};