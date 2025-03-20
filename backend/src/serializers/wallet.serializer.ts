import {type WalletModel} from "../db/schema";

export type WalletResponse = {
    id: string;
    balance: number;
    createdAt: Date | null;
    updatedAt: Date | null;
};

function serializeWallet(wallet: WalletModel): WalletResponse {
    return {
        id: wallet.id,
        balance: Number(wallet.balance),
        createdAt: wallet.createdAt,
        updatedAt: wallet.updatedAt,
    };
};

export {serializeWallet};