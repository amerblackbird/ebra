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
}

export default ERROR_CODES;


