import {serve} from '@hono/node-server'
import {Hono} from 'hono'
import {logger} from 'hono/logger';
import { compress } from 'hono/compress'
import * as dotenv from 'dotenv'
import routes from "./routes";
import {errorHandler} from './utils/errors';

// Load environment variables from the .env file
dotenv.config()

const app = new Hono()

// Add middlewares
app.use('*', logger()); // Use the logger middleware
app.use(compress()) // Use the compress middleware

// Routes and api versioning
app.route('/api/v1', routes);

// Errors handling
app.onError(errorHandler)


// Todo: Read from env
const port = 3000

serve({
    fetch: app.fetch,
    port
}, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`)
})
