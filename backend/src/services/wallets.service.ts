import {db, type UserModel, wallets} from "../db/schema";
import {eq} from "drizzle-orm";

/**
 * Service for handling wallet-related operations.
 */
export class WalletsService {


    /**
     * Creates a new wallet for a user.
     * @param user - The user creating the wallet.
     * @param userId - The ID of the user for whom the wallet is being created.
     * @returns The newly created wallet.
     */
    async create(user: UserModel, userId: string) {
        const [newWallet] = await db.insert(wallets)
            .values({
                userId,
                balance: 0,
                createdById: user.id
            }).returning();
        return newWallet;
    }

    /**
     * Finds a wallet for a user.
     * @param userId - The ID of the user to find the wallet for.
     * @returns The wallet if found, otherwise undefined.
     */
    async findUserWallet(userId: string) {
        const existing = await db.select().from(wallets).where(eq(wallets.userId, userId)).limit(1).execute();
        return existing.length > 0 ? existing[0] : undefined;
    }
}