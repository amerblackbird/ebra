import {z} from "zod";

/**
 * A mapping of Zod validation error codes to user-friendly error messages.
 * These error messages should be localized in the frontend based on the user's language preference.
 */
const VALIDATION_ERROR_CODES = {
    /**
     * This field is required.
     */
    [z.ZodIssueCode.invalid_type]: "FIELD_REQUIRED",
    /**
     * The provided value does not match the expected literal value.
     */
    [z.ZodIssueCode.invalid_literal]: "INVALID_LITERAL_VALUE",
    /**
     * The object contains unrecognized keys.
     */
    [z.ZodIssueCode.unrecognized_keys]: "UNRECOGNIZED_KEYS",
    /**
     * The provided value does not match any of the allowed types.
     */
    [z.ZodIssueCode.invalid_union]: "INVALID_UNION",
    /**
     * The provided value is not a valid option.
     */
    [z.ZodIssueCode.invalid_enum_value]: "INVALID_ENUM_VALUE",
    /**
     * The function arguments are invalid.
     */
    [z.ZodIssueCode.invalid_arguments]: "INVALID_FUNCTION_ARGUMENTS",
    /**
     * The function return type is invalid.
     */
    [z.ZodIssueCode.invalid_return_type]: "INVALID_FUNCTION_RETURN_TYPE",
    /**
     * The provided date is invalid.
     */
    [z.ZodIssueCode.invalid_date]: "INVALID_DATE",
    /**
     * The provided string is invalid.
     */
    [z.ZodIssueCode.invalid_string]: "INVALID_STRING",
    /**
     * The value is too small.
     */
    [z.ZodIssueCode.too_small]: "VALUE_TOO_SMALL",
    /**
     * The value is too big.
     */
    [z.ZodIssueCode.too_big]: "VALUE_TOO_BIG",
    /**
     * The input is invalid.
     */
    [z.ZodIssueCode.custom]: "INVALID_INPUT",
    /**
     * The union discriminator is invalid.
     */
    [z.ZodIssueCode.invalid_union_discriminator]: "INVALID_UNION_DISCRIMINATOR",
    /**
     * The intersection types are invalid.
     */
    [z.ZodIssueCode.invalid_intersection_types]: "INVALID_INTERSECTION_TYPES",
    /**
     * The value must be a multiple of the specified number.
     */
    [z.ZodIssueCode.not_multiple_of]: "NOT_MULTIPLE_OF",
    /**
     * The value must be a finite number.
     */
    [z.ZodIssueCode.not_finite]: "NOT_FINITE",
    INVALID_PASSWORD: "INVALID_PASSWORD",
    /**
     * The input is invalid.
     */
    default: "INVALID_INPUT"
};

export default VALIDATION_ERROR_CODES;