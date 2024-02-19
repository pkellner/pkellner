---
status: publish
published: true
pubDatetime: 2023-09-27T20:00:00.000Z
title: Using Prisma with TypeScript for Rapid Database Query Testing
author:
  display_name: Peter Kellner
  login: Peter Kellner
  email: peter@peterkellner.net
  url: 'https://peterkellner.net'
author_login: admin

display_name: Peter Kellner
login: admin
email: peter@peterkellner.net
author_email: peter@peterkellner.net
description: Prisma, paired with TypeScript and Node.js, empowers developers with a swift, direct-to-console query testing environment. This streamlined approach facilitates quick prototyping and refinement, eliminating the need for complex service or web page integration. It's a modern developer's toolkit for effortless database interactions, offering a rapid feedback loop for the perfect query. Dive in and simplify your database journey!

---

**Using Prisma with TypeScript for Rapid Database Query Testing**

When you're deep in the thick of development, there are times you'd prefer to bypass the overhead of routing database queries through web pages or custom services. You might find yourself itching for a faster way to write, test, and refine a query. Enter Prisma, a database tool for modern developers. Together with TypeScript and Node.js, it offers a rapid means of testing database queries in a streamlined, direct-to-console environment.

**Intro to Prisma: Building Database Apps with JavaScript, Simplified**

Prisma is an open-source database toolkit that aids in accessing databases in a type-safe manner. It boasts a robust query engine and a straightforward syntax, making it easier for JavaScript developers to work with databases. One key feature is its type-safe auto-generated client, which is a game-changer in preventing runtime errors.

**Setting up Our Simple Node Project with TypeScript and Prisma**

1. **Initiate the Project**

   Let's kick things off with a fresh Node.js project:

    ```bash
    mkdir prisma-query-tester && cd prisma-query-tester
    npm init -y
    ```

2. **Install Necessary Packages**

   With the project initialized, let's add TypeScript, Prisma, and their corresponding dependencies:

    ```bash
    npm install typescript ts-node @types/node prisma
    ```

3. **Setup TypeScript Configuration**

   Create a `tsconfig.json` at the root:

    ```json
    {
      "compilerOptions": {
        "target": "es6",
        "module": "commonjs",
        "strict": true,
        "esModuleInterop": true,
        "skipLibCheck": true,
        "forceConsistentCasingInFileNames": true,
        "outDir": "./dist"
      },
      "include": ["src/**/*.ts"],
      "exclude": ["node_modules"]
    }
    ```

   This sets the base TypeScript configuration. We're considering all `.ts` files within a `src` directory.

4. **Initialize Prisma**

   To set up Prisma, run:

    ```bash
    npx prisma init
    ```

   This creates a `prisma` directory containing the `schema.prisma` file.

5. **Configure Database in `schema.prisma`**

   Let's say you're using SQLite for simplicity:

    ```prisma
    datasource db {
      provider = "sqlite"
      url      = "file:./dev.db"
    }
    
    model User {
      id    Int    @id @default(autoincrement())
      name  String
    }
    ```

6. **Generate Prisma Client**

   Run the migrations to create the database and generate the client:

    ```bash
    npx prisma migrate dev --name init
    ```

7. **Write and Test Our Database Query**

   Create a file named `queryTester.ts` in the `src` directory:

    ```typescript
    import { PrismaClient } from '@prisma/client';
    
    const prisma = new PrismaClient();
    
    async function main() {
      const newUser = await prisma.user.create({
        data: {
          name: "John Doe"
        },
      });
      console.log("New user:", newUser);
    
      const allUsers = await prisma.user.findMany();
      console.log("All users:", allUsers);
    }
    
    main()
      .catch(e => {
        throw e
      })
      .finally(async () => {
        await prisma.$disconnect();
      });
    ```

   To run it:

    ```bash
    npx ts-node src/queryTester.ts
    ```

   When executed, this script inserts a new user into the database and then fetches all users, printing the results directly to the console.


**The Benefit: A Tight Development Loop**

In the quest to nail down the perfect query, this setup is invaluable. It detaches you from the clutches of routing your queries through complex services or web pages. With the direct feedback loop to your console, refinement becomes a breeze. So the next time you’re stumped on how to debug a query or prototype a new one, remember this approach—it’s like having a database sandbox at your fingertips!

The technicalities of updating servers, like the nuances of NextJS's getStaticProps and the 304-to-404 transition, can sometimes be overshadowed. However, tools like Prisma make the intricacies more digestible. Happy querying!
