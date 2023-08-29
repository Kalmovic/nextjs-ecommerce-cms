# Ecommerce CMS with NextJS

## Media



https://github.com/Kalmovic/nextjs-ecommerce-cms/assets/42631135/bb8f7ff0-44e0-43b0-be9f-ae3a662e2138



### Stack
- NextJS 13 (Server Components)
- Shadcn UI
- Axios
- Zustand
- Recharts
- Stripe
- Cloudinary (images)
- Prisma / MySQL / PlanetScale
- Clerk (auth)
- Vercel

### Prerequisites

**Node version 14.x**

### Cloning the repository

```shell
git clone https://github.com/Kalmovic/nextjs-ecommerce-cms.git
```

### Install packages

```shell
npm i
```

### Setup .env file


```js
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=""
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=""

# This was inserted by `prisma init`:
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL='
STRIPE_SECRET_KEY=
FRONTEND_STORE_URL=http://localhost:3001
STRIPE_WEBHOOK_SIGNIN_SECRET=
```

### Connect to PlanetScale and Push Prisma
```shell
npx prisma generate
npx prisma db push
```


### Start the app

```shell
npm run dev
```

## Available commands

Running commands with npm `npm run [command]`

| command         | description                              |
| :-------------- | :--------------------------------------- |
| `dev`           | Starts a development instance of the app |
