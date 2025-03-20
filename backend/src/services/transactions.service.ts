import type {AccountsService} from "./accounts.service";
import {ExceptionModel} from "../models/exception";
import ERROR_CODES from "../constants/errors";
import {db, type TransactionModel, transactions, type WalletModel, wallets} from "../db/schema";
import {WalletsService} from "./wallets.service";
import {eq} from "drizzle-orm";
import Decimal from "decimal.js";

export class TransactionsService {
    constructor(
        private readonly accountsService: AccountsService,
        private readonly walletsService: WalletsService,
    ) {
    }


    async charge({userId, amount}: { userId: string, amount: number }): Promise<{
        transaction: TransactionModel,
        wallet: WalletModel
    }> {
        const user = await this.accountsService.findOneById(userId);
        if (!user) {
            throw new ExceptionModel(ERROR_CODES.USER_NOT_FOUND)
        }

        let wallet = await this.walletsService.findUserWallet(userId);

        if (!wallet) {
            // Ensure wallet is created
            wallet = await this.walletsService.create(userId);
        }
        if (new Decimal(wallet.balance).lessThan(amount)) {
            throw new ExceptionModel(ERROR_CODES.INSUFFICIENT_BALANCE, {
                balance: new Decimal(wallet.balance).toNumber(),
                amount: amount,
            })
        }


        // Create transaction record
        return await db.transaction(async (tx) => {
            // Register the transaction
            const [newTransaction] = await tx.insert(transactions)
                .values({
                    userId: user.id,
                    createdById: userId,
                    walletId: wallet.id,
                    amount,
                    type: "charge",
                    status: "completed"
                }).returning();

            // Calculate new balance
            const balance = new Decimal(wallet.balance)
                .minus(amount)
                .toDecimalPlaces(2)
                .toNumber()

            // Update wallet balance
            await tx.update(wallets)
                .set({
                    balance
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
            throw new ExceptionModel(ERROR_CODES.INTERNAL_SERVER_ERROR)
        });

    }

    async topUp({userId, amount}: { userId: string, amount: number }): Promise<{
        transaction: TransactionModel,
        wallet: WalletModel
    }> {
        const user = await this.accountsService.findOneById(userId);
        if (!user) {
            throw new ExceptionModel(ERROR_CODES.USER_NOT_FOUND)
        }


        let wallet = await this.walletsService.findUserWallet(userId);
        if (!wallet) {
            // Ensure wallet is created
            wallet = await this.walletsService.create(userId);
        }


        // Create transaction record
        return await db.transaction(async (tx) => {

            // Register the transaction
            const [newTransaction] = await tx.insert(transactions)
                .values({
                    userId: user.id,
                    createdById: userId,
                    walletId: wallet.id,
                    amount,
                    type: "top-up",
                    status: "completed"
                }).returning();

            // Calculate new balance
            const balance = new Decimal(wallet.balance ?? 0)
                .plus(amount)
                .toDecimalPlaces(2)
                .toNumber();

            // Update wallet balance
            await tx.update(wallets)
                .set({
                    balance
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
            throw new ExceptionModel(ERROR_CODES.INTERNAL_SERVER_ERROR)
        });

    }
}