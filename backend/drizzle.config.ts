import 'dotenv/config';
import {defineConfig} from 'drizzle-kit';


export default defineConfig({
    out: './migrations',
    schema: './src/db/schema.ts',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
    strict: true,
    verbose: true,
    breakpoints: true,
    migrations: {
        table: 'migrations',
        schema: 'public',
    },
});
