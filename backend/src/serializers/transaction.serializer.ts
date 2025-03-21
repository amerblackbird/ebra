import {type TransactionModel, type WalletModel} from "../db/schema";
import {serializeWallet, type WalletResponse} from "./wallet.serializer";

/**
 * Serializes a transaction object into a TransactionResponse.
 * @param {TransactionModel} transaction - The transaction object to serialize.
 * @param {Object} [opts] - Optional parameters.
 * @param {WalletModel} [opts.wallet] - The wallet object to include in the response.
 * @returns {TransactionResponse} - The serialized transaction response.
 */
type TransactionResponse = {
    id: string;
    userId: string;
    walletId: string | null;
    amount: number;
    status: string;
    type: string;
    createdAt: Date | null;
    updatedAt: Date | null;
    createdById: string | null;
    updatedById: string | null;
    wallet?: WalletResponse;
};


/**
 * Serializes a transaction object into a TransactionResponse.
 * @param {TransactionModel} transaction - The transaction object to serialize.
 * @param {Object} [opts] - Optional parameters.
 * @param {WalletModel} [opts.wallet] - The wallet object to include in the response.
 * @returns {TransactionResponse} - The serialized transaction response.
 */
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
        createdById: transaction.createdById,
        updatedById: transaction.updatedById,
        wallet,
    };
};

export {serializeTransaction};