import {db, wallets} from "../db/schema";
import {eq} from "drizzle-orm";

export class WalletsService {

    async create(userId: string) {
        const [newWallet] = await db.insert(wallets)
            .values({
                userId,
                balance: 0,
            }).returning();
        return newWallet;
    }

    async findUserWallet(userId: string) {
        const existing = await db.select().from(wallets).where(eq(wallets.userId, userId)).limit(1).execute();
        return existing.length > 0 ? existing[0] : undefined;
    }


}