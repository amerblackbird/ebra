import {serve} from '@hono/node-server'
import {Hono} from 'hono'
import {logger} from 'hono/logger';

const app = new Hono()

// Add middlewares
app.use('*', logger()); // Use the logger middleware

// Read from env
const port = 3000

serve({
    fetch: app.fetch,
    port
}, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`)
})
