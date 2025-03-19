import 'dotenv/config';

import {z} from 'zod';

/**
 * Schema validation for environment variables using Zod.
 */
const envSchema = z.object({
    PORT: z.string().transform((val) => parseInt(val, 10)).default('3000'),
    LOG_LEVEL: z.string().default('info'),
    NODE_ENV: z.enum(['development', 'production']).default('development'),
    SECRET_KEY: z.string(),
    DATABASE_URL: z.string()
});

/**
 * Parses and validates the environment variables against the schema.
 * @returns {z.infer<typeof envSchema>} The validated environment variables.
 * @throws Will throw an error if validation fails.
 */
export default envSchema.parse(process.env);