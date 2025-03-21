# Ebra Task

Simple wallet system API to manage user accounts with basic operations. This
assignment will assess your ability to design, develop, and implement an API service with
proper handling of edge cases and attention to detail.

> built with [Hono](https://hono.dev), [DrizzleORM](https://orm.drizzle.team/),
> [Postgres](https://www.postgresql.org) and [Zod](https://zod.dev)

- [Ebra Task](#hono-open-api-starter)
    - [Included](#included)
    - [Features](#features)
    - [Setup](#setup)
    - [Code Tour](#code-tour)
    - [Endpoints](#endpoints)
    - [References](#references)

## Included

- Documented / type-safe routes
  with [@hono/zod-openapi](https://github.com/honojs/middleware/tree/main/packages/zod-openapi)
- Type-safe schemas and environment variables with [zod](https://zod.dev/)
- Single source of truth database schemas with [drizzle](https://orm.drizzle.team/docs/overview)
  and [drizzle-zod](https://orm.drizzle.team/docs/zod)
- **Postgres** as the database with [drizzle-pg](https://orm.drizzle.team/docs/pg)
- Structured logging with [pino](https://getpino.io/) / [hono-pino](https://www.npmjs.com/package/hono-pino)
- Date manipulation with [dayjs](https://day.js.org/)
- Decimal handling with [decimal.js](https://mikemcl.github.io/decimal.js/)

## Features

- Authentication APIs
- Account management APIs
- Middleware for logging, compression, and rate limiting
- Environment variable configuration
- Database seeding script

## Setup

Clone this template without git history

```sh
npx degit ebra
cd ebra/backend
```

Create `.env` file

```sh
cp .env.example .env
```

Install dependencies

```sh
pnpm install
```

Create db / push schema

```sh
pnpm drizzle-kit push
```

Run

```sh
pnpm dev
```

Lint

```sh
pnpm lint
```

Test

```sh
pnpm test
```

## Code Tour

Base hono app exported from [app.ts](./src/index.ts). Local development
uses [@hono/node-server](https://hono.dev/docs/getting-started/nodejs) defined in [index.ts](./src/index.ts) - update
this file or create a new entry point to use your preferred runtime.

Typesafe env defined in [env.ts](./src/utils/env.ts) - add any other required environment variables here. The
application will
not start if any required environment variables are missing

[//]: (// TDOD: Add description for routes, controllers, services)

## Endpoints

| Path                       | Description                         |
|----------------------------|-------------------------------------|
| POST /admin/auth           | Admin authentication API            |
| POST /accounts             | Account: Create a new user account. |
| POST /accounts/{id}/top-up | Add balance to a user account.      |
| POST /accounts/{id}/charge | Deduct balance from a user account. |

## Environment Variables

| Name         | Description                                   |
|--------------|-----------------------------------------------|
| NODE_ENV     | The environment in which the app is running.  |
| DATABASE_URL | The URL of the Postgres database.             |
| PORT         | The port to run the API on. Defaults to 3000. |
| SECRET_KEY   | The secret key used for jwt.                  |
| LOG_LEVEL    | The level of logging (e.g., info, debug).     |

## References

- [What is Open API?](https://swagger.io/docs/specification/v3_0/about/)
- [Hono](https://hono.dev/)
    - [Zod OpenAPI Example](https://hono.dev/examples/zod-openapi)
    - [Testing](https://hono.dev/docs/guides/testing)
- [@hono/zod-openapi](https://github.com/honojs/middleware/tree/main/packages/zod-openapi)

