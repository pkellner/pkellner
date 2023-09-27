---
layout: post
status: publish
published: true
title: Using Prisma to Bridge JavaScript Devs to Databases with Elegance
author: Peter Kellner
display_name: Peter Kellner
login: admin
email: peter@peterkellner.net
author_email: peter@peterkellner.net
excerpt: Confused about Prisma's approach to database joins and when to use raw SQL versus native functions? Dive into this post for clarity. We demystify Prisma's handling of database relationships and guide you on when to leverage the precision of raw SQL within the Prisma ecosystem

---

### Using Prisma to Bridge JavaScript Devs to Databases with Elegance

Dive into Prisma's influential role in simplifying data access for JavaScript developers and shed light on some common misconceptions.

* * *

#### **Prisma's Role in Modern Web Development**

In the myriad of tools available for web developers, [Prisma](https://www.prisma.io/) stands out as a paradigm shift. It's not just a database toolkit but a bridge that converts intricate database dynamics into concepts every JavaScript developer is familiar with. With Prisma, data becomes more than mere rows and columns—it's about objects, properties, and relationships.

* * *

#### **Deciphering Joins with Prisma**

The debate on Prisma's handling of joins is rife online. While it's essential to recognize that Prisma thrives on clear database structures, it doesn't merely replace joins with a string of SQL statements.

**SQLite (Relational Database) Example**:

```sql
CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE orders (id INTEGER PRIMARY KEY, total INTEGER, user_id INTEGER, FOREIGN KEY(user_id) REFERENCES users(id));
```

**MongoDB (NoSQL Database) Example**:

```json
{
  "users": {
    "_id": ObjectId("some_id"),
    "name": "John Doe",
    "orders": [{
      "_id": ObjectId("another_id"),
      "total": 100
    }]
  }
}
```

When your structures are well-defined, extracting data becomes intuitive with Prisma:

```javascript
const userWithOrders = await prisma.user.findUnique({
  where: { id: userId },
  include: { orders: true }
});
```

However, for databases lacking clarity in relationships, Prisma's performance can be a tad unpredictable.

* * *

#### **Raw SQL's Power in Prisma**

For those peculiar database setups, Prisma offers a potent solution: raw SQL queries via [`prisma.$executeRaw`](https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access). This feature allows developers to harness the specificity of SQL without forgoing Prisma's benefits.

```javascript
const data = await prisma.$executeRaw`
  SELECT users.name, orders.total
  FROM users
  JOIN orders ON users.u_id = orders.user_ref
  WHERE users.id = ${userId}
`;
```

Utilizing template literals ensures you maintain the typesafety that's core to a reliable application.

* * *

#### **Parting Words**

Navigating the web development landscape requires tools that adapt to our needs. Prisma, with its flexibility and intuitive design, certainly fits the bill. However, it's crucial to use it wisely, acknowledging its strengths and understanding when to diverge.