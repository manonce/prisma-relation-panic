1. Create a .env file with `DATABASE_URL=YOUR_CONNECTION_STRING_HERE` using MySQL
2. `npm i`
3. `npm run init` to push the schema to the database

Observe the panic:

1. `npm run seed:fail` to run `prisma/fail.ts`
2. `npm run start` to run `index.ts`

```bash
/Users/prisma/Code/prisma-relation-panic/node_modules/@prisma/client/runtime/index.js:39822
        throw new PrismaClientUnknownRequestError(message, this.client._clientVersion);
              ^
PrismaClientUnknownRequestError: 
Invalid `prisma.a.findMany()` invocation in
/Users/prisma/Code/prisma-relation-panic/index.ts:8:33

   5 })
   6 
   7 async function main() {
→  8   const result = await prisma.a.findMany(
  called `Option::unwrap()` on a `None` value
    at Object.request (/Users/prisma/Code/prisma-relation-panic/node_modules/@prisma/client/runtime/index.js:39822:15)
    at async PrismaClient._request (/Users/prisma/Code/prisma-relation-panic/node_modules/@prisma/client/runtime/index.js:40646:18)
    at async main (/Users/prisma/Code/prisma-relation-panic/index.ts:8:18) {
  clientVersion: '3.11.0'
}
```

To test data-driven resolution:

1. `npm run seed:succeed`
2. `npm run start`

Notes:

1. After Prisma version 3.11 `npx prisma db seed` will throw an opaque error when the schema includes references to non-unique values:

```bash
An error occured while running the seed command:
Error: Command was killed with SIGKILL (Forced termination): ts-node prisma/seed.ts
```

2. The SQLite connector catches this error on `npx prisma db push`:

```bash
Error: P1012

error: Error validating: The argument `references` must refer to a unique criteria in the related model `A`. But it is referencing the following fields that are not a unique criteria: custom_id
  -->  schema.prisma:21
```