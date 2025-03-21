import type {AccountsService} from "./accounts.service";
import {ExceptionModel} from "../models/exception";
import ERROR_CODES from "../constants/errors";
import {db, type TransactionModel, transactions, type UserModel, type WalletModel, wallets} from "../db/schema";
import {WalletsService} from "./wallets.service";
import {eq} from "drizzle-orm";
import Decimal from "decimal.js";

/**
 * Service for handling transaction-related operations.
 */
export class TransactionsService {
    constructor(
        private readonly accountsService: AccountsService,
        private readonly walletsService: WalletsService,
    ) {
    }

    /**
     * Charges a specified amount from a user's wallet.
     * @param {Object} params - The parameters for the charge operation.
     * @param user
     * @param {string} params.userId - The ID of the user.
     * @param {number} params.amount - The amount to charge.
     * @returns {Promise<Object>} - The transaction and updated wallet.
     * @throws {ExceptionModel} - If the user is not found or has insufficient balance.
     */
    async charge(user: UserModel, {userId, amount}: { userId: string, amount: number }): Promise<{
        transaction: TransactionModel,
        wallet: WalletModel
    }> {
        // Find the user account
        const account = await this.accountsService.findOneById(userId);
        if (!account) {
            throw new ExceptionModel(ERROR_CODES.USER_NOT_FOUND, {
                message: "User not found"
            })
        }

        // Find the user's wallet
        let wallet = await this.walletsService.findUserWallet(userId);

        if (!wallet) {
            // Ensure wallet is created
            wallet = await this.walletsService.create(user, userId);
        }

        // Check if the user has sufficient balance
        if (new Decimal(wallet.balance).lessThan(amount)) {
            throw new ExceptionModel(ERROR_CODES.INSUFFICIENT_BALANCE, {
                message: "Insufficient balance",
                balance: new Decimal(wallet.balance).toNumber(),
                amount: amount,
            })
        }


        // Create transaction record
        return await db.transaction(async (tx) => {
            // Register the transaction
            const [newTransaction] = await tx.insert(transactions)
                .values({
                    userId: account.id,
                    walletId: wallet.id,
                    amount,
                    type: "charge",
                    status: "completed",
                    createdById: user.id
                }).returning();

            // Calculate new balance
            const balance = new Decimal(wallet.balance)
                .minus(amount)
                .toDecimalPlaces(2)
                .toNumber()

            // Update wallet balance
            await tx.update(wallets)
                .set({
                    balance,
                    updatedById: user.id
                })
                .where(eq(wallets.id, wallet.id))
                .execute();

            // Update the wallet object
            wallet.balance = balance;
            wallet.updatedAt = new Date

            return {
                transaction: newTransaction,
                wallet
            };
        }).catch((e) => {
            throw new ExceptionModel(ERROR_CODES.INTERNAL_SERVER_ERROR, {
                message: e.message
            })
        });

    }

    /**
     * Tops up a specified amount to a user's wallet.
     * @param {Object} params - The parameters for the top-up operation.
     * @param user
     * @param {string} params.userId - The ID of the user.
     * @param {number} params.amount - The amount to top up.
     * @returns {Promise<Object>} - The transaction and updated wallet.
     * @throws {ExceptionModel} - If the user is not found.
     */
    async topUp(user: UserModel, {userId, amount}: {
        userId: string, amount: number
    }): Promise<{
        transaction: TransactionModel,
        wallet: WalletModel,
    }> {
        // Find the user account
        const account = await this.accountsService.findOneById(userId);
        if (!account) {
            throw new ExceptionModel(ERROR_CODES.USER_NOT_FOUND, {
                message: "User not found"
            })
        }


        // Find the user's wallet
        let wallet = await this.walletsService.findUserWallet(userId);
        if (!wallet) {
            // Ensure wallet is created
            wallet = await this.walletsService.create(user, userId);
        }


        // Create transaction record
        return await db.transaction(async (tx) => {

            // Register the transaction
            const [newTransaction] = await tx.insert(transactions)
                .values({
                    userId: account.id,
                    walletId: wallet.id,
                    amount,
                    type: "top-up",
                    status: "completed",
                    createdById: user.id
                }).returning();

            // Calculate new balance
            const balance = new Decimal(wallet.balance ?? 0)
                .plus(amount)
                .toDecimalPlaces(2)
                .toNumber();

            // Update wallet balance
            await tx.update(wallets)
                .set({
                    balance,
                    updatedById: user.id
                })
                .where(eq(wallets.id, wallet.id))
                .execute();

            // Update the wallet object
            wallet.balance = balance;
            wallet.updatedAt = new Date();

            return {
                transaction: newTransaction,
                wallet
            };
        }).catch((e) => {
            throw new ExceptionModel(ERROR_CODES.INTERNAL_SERVER_ERROR, {
                message: e.message
            })
        });

    }
}