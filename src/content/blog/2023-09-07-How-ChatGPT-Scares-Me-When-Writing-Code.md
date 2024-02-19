---
status: publish
published: true
pubDatetime: 2023-09-07T20:00:00.000Z
title: How ChatGPT Scares Me When Writing Code
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
description: Discover the risks of using ChatGPT for code generation in TypeScript development. Learn from my experience where seemingly flawless code led to unexpected issues, and why thorough testing is crucial.

---
# How ChatGPT Scares Me When Writing Code

In a previous [blog post](https://peterkellner.net/2023/09/03/converting-pascalcase-to-camelcase-in-javascript-typescript-using-records/), I praised ChatGPT for its ability to help with TypeScript coding tasks, like converting PascalCase to camelCase. However, a closer look at the generated code revealed some issues that caused unexpected problems in my application. This experience serves as a reminder: while tools like ChatGPT can be very useful, it's crucial to carefully review and test their output. Skipping this step can lead to hard-to-find bugs and complicate your development process.

## The Scenario: Converting Nested Object Properties to Camel Case

A few days ago, I set out to convert a deeply nested JavaScript object into a flat structure with camelCase keys. It was a TypeScript function, leveraging type safety and all that good stuff. I decided to use ChatGPT to generate some sample code for me. The example data I fed into ChatGPT was a short list of U.S. Presidents:

```javascript
const presidents = [
  {
    Number: 16,
    Party: "Republican",
    Demographics: {
      First: "Abraham",
      Last: "Lincoln"
    }
  },
  {
    Number: 32,
    Party: "Democratic",
    Demographics: {
      First: "Franklin",
      Last: "Roosevelt"
    }
  }
];
```

Here's what ChatGPT came up with:

```typescript
type Convertible<T> = Record<string, T | Convertible<T>>;

function convertToCamelCase(str: string): string {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

function deepCamelCase<T>(input: Convertible<T>): Convertible<T> {
  let result: Convertible<T> = {};
  for (const [key, value] of Object.entries(input)) {
    const newKey = convertToCamelCase(key);
    if (value !== null && typeof value === 'object') {
      result[newKey] = deepCamelCase(value);
    } else {
      result[newKey] = value;
    }
  }
  return result;
}
```

## What Went Wrong?

It looked good, smelled good, and compiled without issues. So, I started using this function, and everything was a bed of roses, except for one issue: certain properties started losing their values. As I hadn't written the code myself, I more or less took its functionality for granted. It looked sound, so what could possibly go wrong?

After a tedious debugging session, I found that date properties were getting wiped out. To pinpoint the issue, I added a birth date to each President in my sample data:

```javascript
// Adding BirthDate
const presidentsWithBirthDate = [
  {
    Number: 16,
    Party: "Republican",
    Demographics: {
      First: "Abraham",
      Last: "Lincoln",
      BirthDate: new Date("1809-02-12")
    }
  },
  // ... (and so on)
];
```

Bingo! The function was treating the `Date` object like any other generic object and trying to iterate through its keys, effectively wiping its values.

## The Fix

Here's the corrected version:

```typescript
function deepCamelCase<T>(input: Convertible<T>): Convertible<T> {
  let result: Convertible<T> = {};
  for (const [key, value] of Object.entries(input)) {
    const newKey = convertToCamelCase(key);
    if (value instanceof Date) {
      result[newKey] = new Date(value);
    } else if (value !== null && typeof value === 'object') {
      result[newKey] = deepCamelCase(value);
    } else {
      result[newKey] = value;
    }
  }
  return result;
}
```

## What Else Could Go Wrong?

If you think this is a one-off issue, think again. What about other JavaScript primitives like `RegExp`, `Map`, `Set`, or even custom class instances? The point is, not all objects are primitive objects, and not all properties are created equal.

## Concluding Thoughts

ChatGPT is brilliant, but just like any tool, it has its limitations. The issue arises when we start treating generated code as inherently infallible, especially when it looks good on the surface. Code that looks impeccable can have underlying issues that you might overlook if you're not thoroughly validating it. Remember, even if it looks too simple to fail, never get lulled into accepting code, whether it's machine-generated or not, without proper understanding or testing.

So the next time you get that impeccably crafted piece of code from a language model, make sure to give it the scrutiny it deserves. After all, just because it comes from a fancy machine learning model doesn't mean it's bulletproof. Happy coding!
