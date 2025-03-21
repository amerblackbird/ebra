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
git clone https://github.com/amerblackbird/ebra.git
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

Seed database

```sh
pnpm tsx scripts/seed.ts
```

> Seed script will create an admin user with username `admin` and password `admin`
> Use this user to authenticate and access the API
> You can also create a new user with the `/api/v1/accounts` endpoint
> The admin user has the `admin` role and can create, users, and top-up or charge their accounts


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
uses [@hono/node-server](https://hono.dev/docs/getting-started/nodejs) defined in [docs.ts](./src/index.ts) - update
this file or create a new entry point to use your preferred runtime.

Typesafe env defined in [env.ts](./src/utils/env.ts) - add any other required environment variables here. The
application will
not start if any required environment variables are missing

### Project Structure
The project is organized as follows:

```
├── docs
│   ├── Ebra.postman_collection.json    # Postman collection for testing the API
├── src
│   ├── controllers
│   │   └── transactions.controller.ts  # Controller for handling transaction-related requests
│   ├── db
│   │   └── schema.ts                   # Database schema definitions
│   ├── middlewares
│   │   ├── auth-middleware.ts          # Middleware for authentication
│   │   ├── validate-form.middleware.ts # Middleware for form validation
│   │   └── validate-path-param.middleware.ts # Middleware for path parameter validation
│   ├── routes
│   │   └── transactions.routes.ts      # Routes for transaction-related endpoints
│   ├── schemas
│   │   └── transactions.schema.ts      # Schema definitions for transactions
│   ├── serializers
│   │   └── user.serializer.ts          # Serializer for user data
│   ├── services
│   │   ├── accounts.service.ts         # Service for account-related operations
│   │   ├── transactions.service.ts     # Service for transaction-related operations
│   │   └── wallets.service.ts          # Service for wallet-related operations
│   ├── utils
│   │   └── env.ts                      # Utility for environment variable management
│   └── index.ts                        # Entry point of the application
├── scripts
│   └── seed.ts                         # Script for seeding the database
├── .env.example                        # Example environment variables file
├── Makefile                            # Makefile for common tasks
├── package.json                        # Project metadata and dependencies
└── README.md                           # Project documentation
```
### Key Directories and Files

- **src/controllers**: Contains the controllers that handle incoming requests and return responses.
- **src/db**: Contains database schema definitions.
- **src/middlewares**: Contains middleware functions for authentication, validation, etc.
- **src/routes**: Contains route definitions for the API endpoints.
- **src/schemas**: Contains schema definitions for request validation.
- **src/serializers**: Contains serializers to format the data before sending it in responses.
- **src/services**: Contains business logic and interacts with the database.
- **src/utils**: Contains utility functions and configurations.
- **scripts**: Contains scripts for tasks like seeding the database.
- **.env.example**: Example file for environment variables.
- **Makefile**: Contains common tasks for building, running, and managing the project.
- **package.json**: Contains project metadata, scripts, and dependencies.
- **README.md**: Contains project documentation.

This structure helps in organizing the codebase in a modular and maintainable way.


### Environment Variables

| Name         | Description                                   |
|--------------|-----------------------------------------------|
| NODE_ENV     | The environment in which the app is running.  |
| DATABASE_URL | The URL of the Postgres database.             |
| PORT         | The port to run the API on. Defaults to 3000. |
| SECRET_KEY   | The secret key used for jwt.                  |
| LOG_LEVEL    | The level of logging (e.g., info, debug).     |



## API Endpoints

| Path                              | Description                         |
|-----------------------------------|-------------------------------------|
| POST /api/v1/admin/auth           | Admin authentication API            |
| POST /api/v1/accounts             | Account: Create a new user account. |
| POST /api/v1/accounts/{id}/top-up | Add balance to a user account.      |
| POST /api/v1/accounts/{id}/charge | Deduct balance from a user account. |

### Authentication

#### Admin Authentication

**Endpoint:** `POST /api/v1/admin/auth`


> Admin user credentials are `admin` and `admin` created during the seeding process
> Make you seed the database before trying to authenticate
> Run `pnpm tsx scripts/seed.ts` or `make seed`  to seed the database

```json
{
  "username": "admin",
  "password": "admin"
}
```
**Request:**

**Response:**

```json
{
  "id": "a1ac3bc6-42ce-4486-bad8-8c4c144c56f5",
  "email": "admin@admin.com",
  "name": "Admin",
  "createdAt": "2025-03-19T19:48:05.369Z",
  "updatedAt": "2025-03-19T19:48:05.369Z",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhMWFjM2JjNi00MmNlLTQ0ODYtYmFkOC04YzRjMTQ0YzU2ZjUiLCJleHAiOjE3NDI2MTk1NTcsImlhdCI6MTc0MjUzMzE1Nywicm9sZSI6ImFkbWluIn0.c_1QgXlx-9Ng_KuvLd0Jyd8OI0xU4jIUFy9wTzDwsBg",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhMWFjM2JjNi00MmNlLTQ0ODYtYmFkOC04YzRjMTQ0YzU2ZjUiLCJleHAiOjE3NDUxMjUxNTcsImlhdCI6MTc0MjUzMzE1Nywicm9sZSI6ImFkbWluIn0.XF8QM05MSfR0GkBaRzUI2rtvkudWHxY6ZSkYEGBRzkI"
}
```

### Accounts

#### Create Account

**Endpoint:** `POST /api/v1/accounts`

**Request:**

***Body:***
```json
{
  "name": "New user",
  "username": "newuser",
  "password": "newpassword",
  "email": "newuser@example.com"
}
```

***Headers:***

```
{
  "Authorization": "Bearer <accessToken>"
}
```

**Response:**

```json
{
  "id": "b2bc3bc6-42ce-4486-bad8-8c4c144c56f5",
  "name": "New user",
  "username": "newuser",
  "email": "newuser@example.com",
  "role": "user",
  "createdAt": "2025-03-19T19:48:05.369Z",
  "updatedAt": "2025-03-19T19:48:05.369Z"
}
```

### Transactions

#### Top-Up

**Endpoint:** `POST /api/v1/accounts/:id/top-up`

**Request:**

***Body:***

```json
{
  "amount": 100.0
}
```
***Headers:***

```
{
  "Authorization": "Bearer <accessToken>"
}
```

**Response:**

```json
{
  "id": "71ee38a0-8770-4588-9d2a-4beee48553f2",
  "userId": "65f75d5b-4c1e-447c-ae27-3d1aae428821",
  "walletId": "65bbeb62-17f2-4c08-9f89-5343ef8b3c8a",
  "amount": 100.44,
  "status": "completed",
  "type": "top-up",
  "createdAt": "2025-03-21T07:53:53.368Z",
  "updatedAt": "2025-03-21T07:53:53.368Z",
  "createdById": "a1ac3bc6-42ce-4486-bad8-8c4c144c56f5",
  "updatedById": null,
  "wallet": {
    "id": "65bbeb62-17f2-4c08-9f89-5343ef8b3c8a",
    "balance": 1370.36,
    "createdAt": "2025-03-20T22:08:44.347Z",
    "updatedAt": "2025-03-21T04:53:53.375Z"
  }
}
```

> Make you replace `:id` with the actual user id

#### Charge

**Endpoint:** `POST /api/v1/accounts/:id/charge`

**Request:**

***Body:***

```json
{
  "amount": 50.0
}
```
***Headers:***

```
{
  "Authorization": "Bearer <accessToken>"
}
```


**Response:**

```json
{
  "id": "71ee38a0-8770-4588-9d2a-4beee48553f2",
  "userId": "65f75d5b-4c1e-447c-ae27-3d1aae428821",
  "walletId": "65bbeb62-17f2-4c08-9f89-5343ef8b3c8a",
  "amount": 100.44,
  "status": "completed",
  "type": "charge",
  "createdAt": "2025-03-21T07:53:53.368Z",
  "updatedAt": "2025-03-21T07:53:53.368Z",
  "createdById": "a1ac3bc6-42ce-4486-bad8-8c4c144c56f5",
  "updatedById": null,
  "wallet": {
    "id": "65bbeb62-17f2-4c08-9f89-5343ef8b3c8a",
    "balance": 1370.36,
    "createdAt": "2025-03-20T22:08:44.347Z",
    "updatedAt": "2025-03-21T04:53:53.375Z"
  }
}
```

> Make you replace `:id` with the actual user id

## Error Handling

All error responses follow the structure:

```json
{
  "code": "ERROR_CODE",
  "details": {
  }
}
```

## References

- [What is Open API?](https://swagger.io/docs/specification/v3_0/about/)
- [Hono](https://hono.dev/)
    - [Zod OpenAPI Example](https://hono.dev/examples/zod-openapi)
    - [Testing](https://hono.dev/docs/guides/testing)
- [@hono/zod-openapi](https://github.com/honojs/middleware/tree/main/packages/zod-openapi)