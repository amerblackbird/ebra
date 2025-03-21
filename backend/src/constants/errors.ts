/**
 * Error codes used by the frontend to display messages.
 * These error messages should be localized in the frontend based on the user's language preference.
 */
const ERROR_CODES = {
    /**
     * Invalid request error (e.g., missing required fields, invalid data).
     */
    ERROR_INVALID_REQUEST: "ERROR_INVALID_REQUEST",

    /**
     * Internal server error.
     */
    ERROR_SERVER_ERROR: "ERROR_SERVER_ERROR",


    /**
     * Username already exists.
     */
    USERNAME_ALREADY_REGISTERED: "USERNAME_ALREADY_REGISTERED",

    /**
     * Email already exists.
     */
    EMAIL_ALREADY_REGISTERED: "EMAIL_ALREADY_REGISTERED",

    /**
     * Invalid username or password.
     */
    INVALID_CREDENTIALS: "INVALID_CREDENTIALS",

    /**
     * User not found.
     */
    USER_NOT_FOUND: "USER_NOT_FOUND",

    /**
     * Wallet not found.
     */
    USER_WALLET_NOT_FOUND: "USER_WALLET_NOT_FOUND",


    /**
     * Unauthorized access.
     */
    UNAUTHORIZED_ACCESS: "UNAUTHORIZED_ACCESS",



    /**
     * Insufficient balance.
     */
    INSUFFICIENT_BALANCE: "INSUFFICIENT_BALANCE",

    /**
     * Invalid amount.
     */
    INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",


    /**
     * Token expired.
     */
    TOKEN_EXPIRED: "TOKEN_EXPIRED",

}

export default ERROR_CODES;


