import {serve} from '@hono/node-server'
import {logger} from 'hono/logger';
import {compress} from 'hono/compress'
import {rateLimiter} from 'hono-rate-limiter';
import {swaggerUI} from '@hono/swagger-ui'
import env from "./utils/env";
import routes from "./routes";
import {errorHandler} from './utils/errors';
import {showRoutes} from "hono/dev";
import ERROR_CODES from "./constants/errors";
import {Hono} from "hono";

// Load environment variables from the .env file

const app = new Hono()

// Add middlewares
app.use('*', logger()); // Use the logger middleware

app.use(compress()) // Use the compress middleware

// Apply rate limiter globally
app.use(
    rateLimiter({
        windowMs: 15 * 60 * 1000, // 15 minutes
        limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
        standardHeaders: "draft-6", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
        keyGenerator: (c) =>
            c.req.header('x-real-ip') ?? c.req.header('x-forwarded-for') ?? '',
    })
);

// Routes and api versioning
app.route('/api/v1', routes);


// Not found handler
app.notFound((c) => {
    return c.json({
        code: ERROR_CODES.NOT_FOUND,
        details: {
            message: 'Not found'
        }
    })
})

// Errors handling
app.onError(errorHandler)


// Swagger UI
app.get('/ui', swaggerUI({url: '/doc'}))

// Show routes
showRoutes(app);


serve({
    fetch: app.fetch,
    port: env.PORT
}, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`)
})
