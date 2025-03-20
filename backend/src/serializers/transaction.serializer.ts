import {type TransactionModel, type WalletModel} from "../db/schema";
import {serializeWallet, type WalletResponse} from "./wallet.serializer";

type TransactionResponse = {
    id: string;
    userId: string;
    walletId: string | null;
    amount: number;
    status: string;
    type: string;
    createdAt: Date | null;
    updatedAt: Date | null;
    wallet?: WalletResponse;
};

function serializeTransaction(transaction: TransactionModel,
                              opts: {
                                  wallet?: WalletModel
                              } = {}): TransactionResponse {

    let wallet;
    if (opts.wallet) {
        wallet = serializeWallet(opts.wallet);
    }

    return {
        id: transaction.id,
        userId: transaction.userId,
        walletId: transaction.walletId,
        amount: Number(transaction.amount),
        status: transaction.status,
        type: transaction.type,
        createdAt: transaction.createdAt,
        updatedAt: transaction.updatedAt,
        wallet
    };
};

export {serializeTransaction};